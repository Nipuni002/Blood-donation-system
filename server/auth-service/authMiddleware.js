const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to verify JWT token from incoming requests
 * This middleware:
 * 1. Extracts the token from the Authorization header
 * 2. Verifies the token using the JWT_SECRET
 * 3. Decodes the token payload and attaches it to req.user
 * 4. Allows the request to proceed if valid, or returns 401 if invalid
 */
exports.verifyToken = (req, res, next) => {
    // Extract the Authorization header from the request
    // Expected format: "Bearer <token>"
    const token = req.headers["authorization"];

    // Check if token exists in the request
    if (!token) return res.status(401).json({ error: "No token provided" });

    // Verify the token using JWT secret key
    // token.split(" ")[1] removes the "Bearer " prefix to get the actual token
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        // If verification fails (invalid signature, expired, malformed), return error
        if (err) return res.status(401).json({ error: "Invalid token" });

        // If token is valid, attach the decoded payload to req.user
        // Decoded payload contains: { id, role, iat, exp }
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    });
};

/**
 * Middleware to check if the authenticated user has admin privileges
 * Must be used after verifyToken middleware
 * Returns 403 Forbidden if user is not an admin
 */
exports.isAdmin = (req, res, next) => {
    // Check if the decoded user role is "admin"
    // req.user was set by verifyToken middleware
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin access only" });
    }
    
    // User is admin, proceed to the route handler
    next();
};
