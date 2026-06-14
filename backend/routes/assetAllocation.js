const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET ALL ALLOCATIONS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM asset_allocations
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD ALLOCATION
router.post("/", async (req, res) => {
  try {
    const {
      asset_id,
      employee_id,
      allocated_by,
      allocated_date,
      status
    } = req.body;

    const result = await pool.query(
      `INSERT INTO asset_allocations
      (asset_id, employee_id, allocated_by, allocated_date, status)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        asset_id,
        employee_id,
        allocated_by,
        allocated_date,
        status
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;