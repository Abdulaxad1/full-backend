const Joi = require("joi");

const createStuffRoleSchema = Joi.object({
  stuff_id: Joi.number().integer().required(),
  role_id: Joi.number().integer().required(),
});

const updateStuffRoleSchema = Joi.object({
  stuff_id: Joi.number().integer().allow(null),
  role_id: Joi.number().integer().allow(null),
}).min(1);

module.exports = {
  createStuffRoleSchema,
  updateStuffRoleSchema,
};
