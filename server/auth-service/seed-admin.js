const bcrypt = require("bcryptjs");
const pool = require("./db");

/**
 * Seed script to create default admin user
 * Username: Admin
 * Password: admin123
 * 
 * Run this script once to create the admin account:
 * node seed-admin.js
 */

async function seedAdmin() {
    try {
        // Admin credentials (fixed - cannot be created through registration)
        const adminEmail = "admin@gmail.com";
        const adminPassword = "Admin123";
        const adminName = "Administrator";
        const adminRole = "admin";

        // Check if admin already exists
        const existingAdmin = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [adminEmail]
        );

        if (existingAdmin.rows.length > 0) {
            console.log("❌ Admin user already exists!");
            console.log("Email:", adminEmail);
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Insert admin user
        const result = await pool.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
            [adminName, adminEmail, hashedPassword, adminRole]
        );

        console.log("✅ Admin user created successfully!");
        console.log("-----------------------------------");
        console.log("Email:", adminEmail);
        console.log("Password:", adminPassword);
        console.log("Role:", result.rows[0].role);
        console.log("User ID:", result.rows[0].id);
        console.log("-----------------------------------");
        console.log("⚠️  Admin can only login with these credentials!");
        console.log("⚠️  Regular users can register through the registration form!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating admin user:", error.message);
        process.exit(1);
    }
}

// Run the seed function
seedAdmin();
