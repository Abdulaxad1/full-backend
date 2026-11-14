const Joi = require("joi");

const createGroupStuffSchema = Joi.object({
  group_id: Joi.number().integer().required(),
  stuff_id: Joi.number().integer().required(),
});

const updateGroupStuffSchema = Joi.object({
  group_id: Joi.number().integer().allow(null),
  stuff_id: Joi.number().integer().allow(null),
}).min(1);

module.exports = {
  createGroupStuffSchema,
  updateGroupStuffSchema,
};
