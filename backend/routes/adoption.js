const express = require("express");
const db = require("../db");

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

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Adoption submission failed" });
        }

        res.json({
            message: "Adoption application submitted successfully",
            adoption_id: result.insertId
        });
    });
});

module.exports = router;

router.get("/test", (req, res) => {
    res.send("Adoption route working");
});
