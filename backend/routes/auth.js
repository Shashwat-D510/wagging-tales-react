const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

/* ================= SIGNUP ================= */
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Signup failed" });
            }

            res.status(201).json({ message: "User registered successfully" });
        }
    );
});

/* ================= SIGNIN ================= */
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error" });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "User not found" });
            }

            const user = result[0];

            const isMatch = bcrypt.compareSync(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            res.status(200).json({
                message: "Signin successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    );
});

module.exports = router;
