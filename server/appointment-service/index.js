const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const db = require('./db')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretjwtkey'

function verifyToken(req, res, next) {
  if (process.env.SKIP_AUTH === 'true') {
    // allow user_id via header or body for dev convenience
    req.user = { id: req.headers['x-user-id'] || req.body.user_id || null, role: req.headers['x-user-role'] || 'user' }
    return next()
  }

  const header = req.headers['authorization'] || req.headers['Authorization']
  if (!header) return res.status(401).json({ error: 'No token provided' })
  const parts = header.split(' ')
  if (parts.length !== 2) return res.status(401).json({ error: 'Token error' })

  const token = parts[1]
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' })
    req.user = decoded
    next()
  })
}

// Create appointment
app.post('/appointments', verifyToken, async (req, res) => {
  const userId = req.user && req.user.id
  const { donor_name, donor_contact, date, time, location, notes } = req.body
  if (!userId) return res.status(400).json({ error: 'User ID required' })
  if (!date || !time) return res.status(400).json({ error: 'Date and time required' })

  try {
    const result = await db.query(
      `INSERT INTO appointments (user_id, donor_name, donor_contact, date, time, location, notes, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'pending', NOW()) RETURNING *`,
      [userId, donor_name || null, donor_contact || null, date, time, location || null, notes || null]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('Insert appointment error', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Get appointments - admin gets all, users get own
app.get('/appointments', verifyToken, async (req, res) => {
  const userId = req.user && req.user.id
  const role = req.user && req.user.role
  try {
    let q, params
    if (role === 'admin') {
      q = 'SELECT * FROM appointments ORDER BY date, time'
      params = []
    } else {
      q = 'SELECT * FROM appointments WHERE user_id = $1 ORDER BY date, time'
      params = [userId]
    }
    const result = await db.query(q, params)
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch appointments error', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Get single appointment
app.get('/appointments/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const userId = req.user && req.user.id
  const role = req.user && req.user.role
  try {
    const r = await db.query('SELECT * FROM appointments WHERE id = $1', [id])
    if (r.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    const appt = r.rows[0]
    if (role !== 'admin' && String(appt.user_id) !== String(userId)) return res.status(403).json({ error: 'Forbidden' })
    res.json(appt)
  } catch (err) {
    console.error('Get appointment error', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update appointment (owner or admin)
app.put('/appointments/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const userId = req.user && req.user.id
  const role = req.user && req.user.role
  const { donor_name, donor_contact, date, time, location, notes, status } = req.body
  try {
    const r = await db.query('SELECT * FROM appointments WHERE id = $1', [id])
    if (r.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    const appt = r.rows[0]
    if (role !== 'admin' && String(appt.user_id) !== String(userId)) return res.status(403).json({ error: 'Forbidden' })
    // Prevent non-admins from changing the appointment status
    const newStatus = (role === 'admin') ? (status || appt.status) : appt.status

    const updated = await db.query(
      `UPDATE appointments SET donor_name=$1, donor_contact=$2, date=$3, time=$4, location=$5, notes=$6, status=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
      [donor_name || appt.donor_name, donor_contact || appt.donor_contact, date || appt.date, time || appt.time, location || appt.location, notes || appt.notes, newStatus, id]
    )
    res.json(updated.rows[0])
  } catch (err) {
    console.error('Update appointment error', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Admin-only: change appointment status (accept/reject/confirm/cancel)
app.put('/appointments/:id/status', verifyToken, async (req, res) => {
  const id = req.params.id
  const role = req.user && req.user.role
  const { status } = req.body
  if (role !== 'admin') return res.status(403).json({ error: 'Admin only' })

  const allowed = ['pending', 'accepted', 'rejected', 'confirmed', 'cancelled']
  if (!status || !allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' })

  try {
    const r = await db.query('SELECT * FROM appointments WHERE id = $1', [id])
    if (r.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    const updated = await db.query(
      `UPDATE appointments SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [status, id]
    )
    res.json(updated.rows[0])
  } catch (err) {
    console.error('Change status error', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete appointment (owner or admin)
app.delete('/appointments/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const userId = req.user && req.user.id
  const role = req.user && req.user.role
  try {
    const r = await db.query('SELECT * FROM appointments WHERE id = $1', [id])
    if (r.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    const appt = r.rows[0]
    if (role !== 'admin' && String(appt.user_id) !== String(userId)) return res.status(403).json({ error: 'Forbidden' })
    await db.query('DELETE FROM appointments WHERE id = $1', [id])
    res.json({ success: true })
  } catch (err) {
    console.error('Delete appointment error', err)
    res.status(500).json({ error: 'Database error' })
  }
})

// debug route: show table columns
app.get('/debug/schema', async (req, res) => {
  try {
    const r = await db.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name='appointments'`)
    res.json(r.rows)
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
})

// Ensure appointments table exists before starting
async function ensureSchema() {
  const createAppointments = `CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    donor_name VARCHAR(150),
    donor_contact VARCHAR(100),
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location VARCHAR(200),
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
  );`;
  try {
    await db.query(createAppointments);
    console.log('[Appointment-Service] appointments table ensured');
  } catch (err) {
    console.error('[Appointment-Service] Failed ensuring appointments table', err);
    throw err;
  }
}

const port = process.env.PORT || 3010
ensureSchema()
  .then(() => {
    app.listen(port, () => console.log(`Appointment service listening on ${port}`))
  })
  .catch(() => process.exit(1))
