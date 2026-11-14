const Joi = require("joi");

const createRoleSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateRoleSchema = Joi.object({
  name: Joi.string().trim().allow(null, ""),
}).min(1);

module.exports = {
  createRoleSchema,
  updateRoleSchema,
};
