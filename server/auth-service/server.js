const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./authRoutes");
const pool = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Logging
app.use((req, res, next) => {
    console.log(`[Auth-Service] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/auth", authRoutes);

// Health Check
app.get("/health", async (req, res) => {
    try {
        const r = await pool.query("SELECT 1 AS ok");
        res.json({ service: "auth-service", status: "running", db: r.rows[0].ok === 1 ? "up" : "unknown" });
    } catch (e) {
        res.status(500).json({ service: "auth-service", status: "running", db: "error", error: e.message });
    }
});

// Ensure users table exists before starting server
async function ensureSchema() {
    const createUsers = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    try {
        await pool.query(createUsers);
        console.log('[Auth-Service] users table ensured');
    } catch (err) {
        console.error('[Auth-Service] Failed ensuring users table', err);
        throw err;
    }
}

const PORT = process.env.PORT || 4000;
ensureSchema()
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Auth Service running on port ${PORT}`);
    });
  })
  .catch(() => {
    // Exit so container can restart if schema init failed
    process.exit(1);
  });
