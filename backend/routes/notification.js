const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET ALL
router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM notifications ORDER BY id DESC"
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

    const { user_id, title, message } = req.body;

    const result = await pool.query(
      `
      INSERT INTO notifications
      (user_id,title,message)
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [user_id, title, message]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// MARK AS READ
router.put("/:id", async (req, res) => {
  try {

    await pool.query(
      `
      UPDATE notifications
      SET is_read=true
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      message: "Notification Read"
    });

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
      "DELETE FROM notifications WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;