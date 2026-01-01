const express = require("express");
const { register, login } = require("./authController");
const { verifyToken, isAdmin } = require("./authMiddleware");

const router = express.Router();

/**
 * JWT AUTHENTICATION FLOW:
 * 
 * 1. REGISTRATION (Public Route):
 *    - User signs up with credentials
 *    - Password is hashed and stored
 *    - No token issued yet
 * 
 * 2. LOGIN (Public Route):
 *    - User provides credentials
 *    - Server validates and generates JWT token
 *    - Client receives token and stores it
 * 
 * 3. PROTECTED ROUTES:
 *    - Client sends token in Authorization header: "Bearer <token>"
 *    - verifyToken middleware validates the token
 *    - If valid, request proceeds; if invalid, returns 401
 * 
 * 4. ROLE-BASED ACCESS:
 *    - isAdmin middleware checks user role from decoded token
 *    - Grants/denies access based on role
 */

// ===== PUBLIC ROUTES (No Authentication Required) =====
// User registration - creates account with hashed password
router.post("/register", register);

// User login - validates credentials and returns JWT token
router.post("/login", login);

// ===== PROTECTED ROUTES (JWT Token Required) =====
// Example of admin-only route
// Middleware chain: verifyToken (validates JWT) -> isAdmin (checks role)
router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
    // This handler only executes if both middleware pass
    // req.user contains decoded token data: { id, role }
    res.json({ message: "Admin verified" });
});

module.exports = router;
