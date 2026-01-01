const bcrypt = require("bcryptjs");
const pool = require("./db");

/**
 * Update existing admin password to Admin123
 */

async function updateAdminPassword() {
    try {
        const adminEmail = "admin@gmail.com";
        const newPassword = "Admin123";

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update admin password
        const result = await pool.query(
            `UPDATE users SET password = $1 WHERE email = $2 RETURNING id, email, role`,
            [hashedPassword, adminEmail]
        );

        if (result.rows.length === 0) {
            console.log("❌ Admin user not found with email:", adminEmail);
            process.exit(1);
        }

        console.log("✅ Admin password updated successfully!");
        console.log("-----------------------------------");
        console.log("Email:", adminEmail);
        console.log("Password:", newPassword);
        console.log("Role:", result.rows[0].role);
        console.log("-----------------------------------");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating admin password:", error.message);
        process.exit(1);
    }
}

updateAdminPassword();
