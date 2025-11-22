const express = require("express");
const { register, login } = require("./authController");
const { verifyToken, isAdmin } = require("./authMiddleware");

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected Route Example
router.get("/admin-only", verifyToken, isAdmin, (req, res) => {
    res.json({ message: "Admin verified" });
});

module.exports = router;
