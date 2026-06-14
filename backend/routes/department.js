const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET ALL DEPARTMENTS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// ADD DEPARTMENT
router.post("/", async (req, res) => {
  try {

    const { department_name } = req.body;

    const result = await pool.query(
      `INSERT INTO departments
      (department_name)
      VALUES ($1)
      RETURNING *`,
      [department_name]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// UPDATE DEPARTMENT
router.put("/:id", async (req, res) => {
  try {

    const { department_name } = req.body;

    const result = await pool.query(
      `UPDATE departments
       SET department_name=$1
       WHERE id=$2
       RETURNING *`,
      [department_name, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// DELETE DEPARTMENT
router.delete("/:id", async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM departments WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Department Deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;