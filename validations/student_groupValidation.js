const Joi = require("joi");

const createStudentGroupSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  group_id: Joi.number().integer().required(),
});

const updateStudentGroupSchema = Joi.object({
  student_id: Joi.number().integer().allow(null),
  group_id: Joi.number().integer().allow(null),
}).min(1);

module.exports = {
  createStudentGroupSchema,
  updateStudentGroupSchema,
};
