const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../config/db");

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({ storage });

// Upload Image
router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {

      const { employee_id } = req.body;

      const imageUrl =
        "http://localhost:5000/uploads/" +
        req.file.filename;

      const result = await pool.query(
        `
        INSERT INTO employee_images
        (employee_id,image_url)
        VALUES($1,$2)
        RETURNING *
        `,
        [employee_id, imageUrl]
      );

      res.json(result.rows[0]);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);

// Get Images
router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM employee_images ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM employee_images WHERE id=$1",
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