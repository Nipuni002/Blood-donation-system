const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");

/**
 * User Registration Handler
 * Creates a new user account with hashed password
 * All registered users are assigned 'user' role by default
 * Admin accounts cannot be created through registration
 * No JWT token is issued here - user must login after registration
 */
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // All registrations are assigned 'user' role automatically
        // Admin accounts cannot be registered through this endpoint
        const role = "user";

        // Hash the password using bcrypt with salt rounds of 10
        // This ensures passwords are never stored in plain text
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database with hashed password and 'user' role
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

/**
 * User Login Handler - JWT Token Generation
 * This is where the JWT authentication process begins:
 * 1. Verify user credentials (email + password)
 * 2. Generate a signed JWT token containing user data
 * 3. Send token to client for use in subsequent requests
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Query database to find user by email
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // Check if user exists
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];
        
        // Compare provided password with stored hashed password
        // bcrypt.compare() hashes the input and compares with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ===== JWT TOKEN GENERATION =====
        // Create a signed JWT token containing user information
        const token = jwt.sign(
            // Payload: Data to encode in the token (visible but tamper-proof)
            { id: user.id, role: user.role },
            
            // Secret: Private key used to sign the token (must be kept secure)
            process.env.JWT_SECRET,
            
            // Options: Token expires in 2 hours for security
            { expiresIn: "2h" }
        );

        // Send token to client
        // Client must store this token (localStorage/sessionStorage)
        // and include it in Authorization header for protected routes
        res.json({
            message: "Login successful",
            token,  // JWT token - client will use this for authentication
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
