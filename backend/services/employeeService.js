const employeeRepository = require("../repositories/employeeRepository");

// GET ALL EMPLOYEES
const getAllEmployees = async () => {
  return await employeeRepository.getAllEmployees();
};

// CREATE EMPLOYEE
const createEmployee = async (employeeData) => {
  const {
    user_id,
    department_id,
    phone,
    address,
    designation,
    salary
  } = employeeData;

  return await employeeRepository.createEmployee(
    user_id,
    department_id,
    phone,
    address,
    designation,
    salary
  );
};

// DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  return await employeeRepository.deleteEmployee(id);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  deleteEmployee
};