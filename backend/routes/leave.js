const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET ALL LEAVES (FIXED)
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leave_applications ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// APPLY LEAVE
router.post("/apply", async (req, res) => {
  try {
    const { employee_id, leave_type, from_date, to_date, reason } = req.body;

    await pool.query(
      `INSERT INTO leave_applications 
      (employee_id, leave_type, from_date, to_date, reason, status)
      VALUES ($1,$2,$3,$4,$5,'Pending')`,
      [employee_id, leave_type, from_date, to_date, reason]
    );

    res.json({ message: "Leave applied" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE STATUS
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await pool.query(
      "UPDATE leave_applications SET status=$1 WHERE id=$2",
      [status, req.params.id]
    );

    res.json({ message: "Updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;