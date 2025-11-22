const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.url);
    next();
});

// -----------------------------------------------------
// CREATE donor (POST)
// -----------------------------------------------------
app.post('/donors', async (req, res) => {
    try {
        const { name, bloodgroup, location, phone } = req.body;

        if (!name || !bloodgroup) {
            return res.status(400).json({ error: 'name and bloodgroup are required' });
        }

        const query = `
            INSERT INTO donors (name, bloodgroup, location, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const result = await pool.query(query, [name, bloodgroup, location, phone]);
        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error("POST /donors error:", err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// -----------------------------------------------------
// GET all donors
// -----------------------------------------------------
app.get('/donors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM donors ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("GET /donors error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// GET donor by ID
// -----------------------------------------------------
app.get('/donors/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM donors WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error("GET /donors/:id error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// UPDATE donor (PUT)
// -----------------------------------------------------
app.put('/donors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bloodgroup, location, phone } = req.body;

        const query = `
            UPDATE donors
            SET name = $1, bloodgroup = $2, location = $3, phone = $4
            WHERE id = $5
            RETURNING *
        `;

        const result = await pool.query(query, [
            name, bloodgroup, location, phone, id
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error("PUT /donors/:id error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// DELETE donor
// -----------------------------------------------------
app.delete('/donors/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM donors WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json({ message: 'Donor deleted successfully' });

    } catch (err) {
        console.error("DELETE /donors/:id error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// -----------------------------------------------------
// DB health check
// -----------------------------------------------------
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ ok: true, time: result.rows[0].now });
    } catch (err) {
        console.error("GET /db error:", err.message);
        res.status(500).json({ ok: false, error: err.message });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Donor API running');
});

// Ensure donors table exists before starting server (idempotent)
async function ensureSchema() {
    const createDonors = `CREATE TABLE IF NOT EXISTS donors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        bloodgroup VARCHAR(5),
        location VARCHAR(100),
        phone VARCHAR(15),
        user_id INTEGER
    );`;
    try {
        await pool.query(createDonors);
        console.log('[Donor-Service] donors table ensured');
    } catch (err) {
        console.error('[Donor-Service] Failed ensuring donors table', err);
        throw err;
    }
}

const PORT = process.env.PORT || 3000;
ensureSchema()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Donor Service running on port ${PORT}`);
    });
  })
  .catch(() => process.exit(1));
