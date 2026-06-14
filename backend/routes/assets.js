const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// =====================
// GET ALL ASSETS
// =====================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM assets ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// =====================
// ADD ASSET
// =====================
router.post("/", async (req, res) => {
  try {
    const {
      asset_code,
      asset_name,
      asset_type,
      purchase_date,
      purchase_cost,
      status
    } = req.body;

    const result = await pool.query(
      `INSERT INTO assets
      (asset_code, asset_name, asset_type, purchase_date, purchase_cost, status)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        asset_code,
        asset_name,
        asset_type,
        purchase_date,
        purchase_cost,
        status
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// =====================
// DELETE ASSET
// =====================
router.delete("/:id", async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM assets WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Asset Deleted Successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;