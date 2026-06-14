const Joi = require("joi");

const employeeSchema = Joi.object({
  user_id: Joi.number().required(),

  department_id: Joi.number().required(),

  phone: Joi.string().required(),

  address: Joi.string().required(),

  designation: Joi.string().required(),

  salary: Joi.number().required()
});

module.exports = employeeSchema;