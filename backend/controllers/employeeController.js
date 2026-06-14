const employeeService = require("../services/employeeService");
const employeeSchema = require("../validations/employeeValidation");

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const { error } = employeeSchema.validate(req.body);

if (error) {
  return res.status(400).json({
    message: error.details[0].message
  });
}
    const employee = await employeeService.createEmployee(req.body);

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);

    res.json({
      message: "Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  deleteEmployee
};