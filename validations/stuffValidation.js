const Joi = require("joi");

const createStuffSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().allow(null, "").optional(),
  phone_number: Joi.string().trim().allow(null, "").optional(),
  login: Joi.string().trim().required(),
  parol: Joi.string().min(6).required(),
  is_active: Joi.boolean().allow(null).optional(),
});

const updateStuffSchema = Joi.object({
  first_name: Joi.string().trim().allow(null, ""),
  last_name: Joi.string().trim().allow(null, ""),
  phone_number: Joi.string().trim().allow(null, ""),
  login: Joi.string().trim().allow(null, ""),
  parol: Joi.string().min(6),
  is_active: Joi.boolean().allow(null),
}).min(1);

const loginStuffSchema = Joi.object({
  login: Joi.string().trim().required(),
  parol: Joi.string().required(),
});

module.exports = {
  createStuffSchema,
  updateStuffSchema,
  loginStuffSchema,
};
