const express = require("express");
const db = require("../db");
const sendEmail = require("../utils/sendEmail"); // ✅ ONLY ADDITION

const router = express.Router();

/* ================= CREATE ADOPTION ================= */
router.post("/", (req, res) => {
    const {
        user_id,
        dog_name,

        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        pincode,

        residence_type,
        ownership,
        total_members,
        children_below_10,
        other_pets,

        adoption_reason,
        primary_caregiver,
        vet_contact,

        home_check_agree,
        vet_care_agree,
        spay_neuter_agree,
        info_confirmed
    } = req.body;

    const sql = `
        INSERT INTO adoptions (
            user_id, dog_name,
            first_name, last_name, email, phone, address, city, state, pincode,
            residence_type, ownership, total_members, children_below_10, other_pets,
            adoption_reason, primary_caregiver, vet_contact,
            home_check_agree, vet_care_agree, spay_neuter_agree, info_confirmed
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        user_id,
        dog_name,

        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        pincode,

        residence_type,
        ownership,
        total_members,
        children_below_10,
        other_pets,

        adoption_reason,
        primary_caregiver,
        vet_contact,

        home_check_agree,
        vet_care_agree,
        spay_neuter_agree,
        info_confirmed
    ];

    db.query(sql, values, async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Adoption submission failed" });
        }

        // ✅ EMAIL (does NOT affect DB success)
        try {
            await sendEmail(
                email,
                "Adoption Under Process",
                `Hello ${first_name},

Thank you for choosing to adopt ${dog_name} 🐶

Your adoption application has been successfully submitted and is currently under review.
Our team will contact you shortly.

Warm regards,
Wagging Tales Team`
            );
        } catch (emailErr) {
            console.error("Email failed:", emailErr);
            // ❌ email failure does NOT block adoption
        }

        res.json({
            message: "Adoption application submitted successfully",
            adoption_id: result.insertId
        });
    });
});

/* ================= TEST ROUTE ================= */
router.get("/test", (req, res) => {
    res.send("Adoption route working");
});

module.exports = router;
