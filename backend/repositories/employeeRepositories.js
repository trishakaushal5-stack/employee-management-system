const pool = require("../config/db");

// GET ALL EMPLOYEES
const getAllEmployees = async () => {
  const data = await pool.query(
    "SELECT * FROM employee_profiles ORDER BY id DESC"
  );

  return data.rows;
};

// CREATE EMPLOYEE
const createEmployee = async (
  user_id,
  department_id,
  phone,
  address,
  designation,
  salary
) => {
  const result = await pool.query(
    `
    INSERT INTO employee_profiles
    (
      user_id,
      department_id,
      phone,
      address,
      designation,
      salary
    )
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

  return result.rows[0];
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  await pool.query(
    "DELETE FROM employee_profiles WHERE id=$1",
    [id]
  );
};

module.exports = {
  getAllEmployees,
  createEmployee,
  deleteEmployee
};