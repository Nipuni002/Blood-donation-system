const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: "All fields required" });
        }

        if (role !== "admin" && role !== "user") {
            return res.status(400).json({ error: "Invalid role" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: "User registered", user: result.rows[0] });
    } catch (err) {
        // Postgres unique violation code is 23505
        if (err.code === '23505' || (err.message && err.message.includes('duplicate'))) {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: err.message || 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login successful",
            token,
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
