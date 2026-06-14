const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const cache = require("../../utils/cache");

// ================= GET ALL EMPLOYEES =================
router.get("/", async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const search = req.query.search || "";

    const sort = req.query.sort || "id";
    const order = req.query.order || "ASC";

    const offset = (page - 1) * limit;

    const cacheKey = `employees_${page}_${search}_${sort}_${order}`;

    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const result = await pool.query(
      `
      SELECT *
      FROM employee_profiles
      WHERE designation ILIKE $1
      ORDER BY ${sort} ${order}
      LIMIT $2
      OFFSET $3
      `,
      [`%${search}%`, limit, offset]
    );

    cache.set(cacheKey, result.rows);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ================= ADD EMPLOYEE =================
router.post("/", async (req, res) => {
  try {

    const {
      user_id,
      department_id,
      phone,
      address,
      designation,
      salary
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO employee_profiles
      (user_id, department_id, phone, address, designation, salary)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        user_id,
        department_id,
        phone,
        address,
        designation,
        salary
      ]
    );

    cache.flushAll();

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ================= UPDATE EMPLOYEE =================
router.put("/:id", async (req, res) => {
  try {

    const {
      user_id,
      department_id,
      phone,
      address,
      designation,
      salary
    } = req.body;

    const result = await pool.query(
      `
      UPDATE employee_profiles
      SET user_id=$1,
          department_id=$2,
          phone=$3,
          address=$4,
          designation=$5,
          salary=$6
      WHERE id=$7
      RETURNING *
      `,
      [
        user_id,
        department_id,
        phone,
        address,
        designation,
        salary,
        req.params.id
      ]
    );

    cache.flushAll();

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ================= DELETE EMPLOYEE =================
router.delete("/:id", async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM employee_profiles WHERE id=$1",
      [req.params.id]
    );

    cache.flushAll();

    res.json({
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;