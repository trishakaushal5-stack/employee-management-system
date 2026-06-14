const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET ALL LOGS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM audit_logs ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// ADD LOG
router.post("/", async (req, res) => {
  try {

    const {
      table_name,
      action_type,
      record_id,
      performed_by
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO audit_logs
      (table_name, action_type, record_id, performed_by)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [
        table_name,
        action_type,
        record_id,
        performed_by
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;