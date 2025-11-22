const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[Request-Service] ${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretjwtkey';
function verifyToken(req, res, next) {
  if (process.env.SKIP_AUTH === 'true') {
    const uid = req.body.user_id || req.query.user_id || req.headers['x-user-id'] || 1;
    const role = req.body.role || req.query.role || req.headers['x-user-role'] || 'user';
    req.user = { id: Number(uid), role };
    return next();
  }
  const auth = req.headers['authorization'] || req.headers['Authorization'];
  if (!auth) return res.status(401).json({ error: 'No token provided' });
  const parts = auth.trim().split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid token format' });
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    // Ensure required fields
    if (!decoded.id) return res.status(401).json({ error: 'Token missing id' });
    req.user = { id: decoded.id, role: decoded.role || 'user' };
    next();
  });
}

// Ensure requests table exists before handling traffic
async function ensureSchema() {
  const createTableSQL = `CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    patient_name VARCHAR(200) NOT NULL,
    required_blood_group VARCHAR(20) NOT NULL,
    hospital VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    contact_number VARCHAR(50),
    urgency VARCHAR(50) DEFAULT 'Normal',
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;
  try {
    await pool.query(createTableSQL);
    console.log('[Request-Service] requests table ensured');
  } catch (err) {
    console.error('[Request-Service] Failed ensuring schema', err);
    throw err;
  }
}

// POST /request - submit a blood request (any authenticated user)
app.post('/request', verifyToken, async (req, res) => {
  try {
    const { patient_name, required_blood_group, hospital, location, contact_number, urgency } = req.body;
    if (!patient_name || !required_blood_group || !hospital) {
      return res.status(400).json({ error: 'patient_name, required_blood_group and hospital are required' });
    }

    const q = `INSERT INTO requests (user_id, patient_name, required_blood_group, hospital, location, contact_number, urgency, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    const result = await pool.query(q, [req.user.id, patient_name, required_blood_group, hospital, location, contact_number, urgency || 'Normal', 'Pending']);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /request - view all requests
app.get('/request', verifyToken, async (req, res) => {
  try {
    let result;
    if (req.user && req.user.role === 'admin') {
      // Admin sees all requests
      result = await pool.query('SELECT * FROM requests ORDER BY created_at DESC');
    } else {
      // Regular users see only their own requests
      result = await pool.query('SELECT * FROM requests WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /request/:id - view one request
app.get('/request/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM requests WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Request not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /request/:id/status - update processing status (admin only)
app.put('/request/:id/status', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });
    const q = `UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`;
    const result = await pool.query(q, [status, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Request not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /request/:id - allow owner or admin to delete a request
app.delete('/request/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    // ensure exists
    const existing = await pool.query('SELECT * FROM requests WHERE id = $1', [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: 'Request not found' });
    const reqRow = existing.rows[0];
    // allow admin or owner
    if (req.user.role !== 'admin' && reqRow.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    await pool.query('DELETE FROM requests WHERE id = $1', [id]);
    res.json({ message: 'Request deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// health
app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/', (req, res) => res.json({ message: 'Request Service running' }));

const PORT = process.env.PORT || 3002;
ensureSchema().then(() => {
  app.listen(PORT, () => console.log(`Request Service listening on ${PORT}`));
}).catch(err => {
  console.error('Fatal: could not start Request Service due to schema error');
  process.exit(1);
});
