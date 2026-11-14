const Joi = require("joi");

const createStageSchema = Joi.object({
  name: Joi.string().trim().required(),
});

const updateStageSchema = Joi.object({
  name: Joi.string().trim().allow(null, ""),
}).min(1);

module.exports = {
  createStageSchema,
  updateStageSchema,
};
