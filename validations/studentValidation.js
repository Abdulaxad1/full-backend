const Joi = require("joi");

const createStudentSchema = Joi.object({
  lid_id: Joi.number().integer().allow(null).optional(),
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().allow(null, "").optional(),
  phone_number: Joi.string().trim().allow(null, "").optional(),
  birthday: Joi.date().iso().allow(null).optional(),
  gender: Joi.string().trim().allow(null, "").optional(),
});

const updateStudentSchema = Joi.object({
  lid_id: Joi.number().integer().allow(null),
  first_name: Joi.string().trim().allow(null, ""),
  last_name: Joi.string().trim().allow(null, ""),
  phone_number: Joi.string().trim().allow(null, ""),
  birthday: Joi.date().iso().allow(null),
  gender: Joi.string().trim().allow(null, ""),
}).min(1);

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};
