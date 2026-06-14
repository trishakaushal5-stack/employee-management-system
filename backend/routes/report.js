const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Employee Report
router.get("/employees", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ep.id,
             u.name,
             d.department_name,
             ep.designation,
             ep.salary
      FROM employee_profiles ep
      JOIN users u ON ep.user_id = u.id
      JOIN departments d ON ep.department_id = d.id
      ORDER BY ep.id
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Department Report
router.get("/departments", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT d.department_name,
             COUNT(ep.id) AS total_employees
      FROM departments d
      LEFT JOIN employee_profiles ep
      ON d.id = ep.department_id
      GROUP BY d.department_name
      ORDER BY d.department_name
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Leave Report
router.get("/leaves", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT *
      FROM leave_applications
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Asset Report
router.get("/assets", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT *
      FROM assets
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;