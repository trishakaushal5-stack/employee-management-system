const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM skills ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// ADD
router.post("/", async (req, res) => {
  try {

    const { skill_name } = req.body;

    const result = await pool.query(
      `INSERT INTO skills(skill_name)
       VALUES($1)
       RETURNING *`,
      [skill_name]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {

    const { skill_name } = req.body;

    const result = await pool.query(
      `UPDATE skills
       SET skill_name=$1
       WHERE id=$2
       RETURNING *`,
      [skill_name, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM skills WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Skill Deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;