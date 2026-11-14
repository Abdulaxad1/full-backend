const Joi = require("joi");

const createLidStatusSchema = Joi.object({
  status: Joi.string().trim().required(),
});

const updateLidStatusSchema = Joi.object({
  status: Joi.string().trim().allow(null, ""),
}).min(1);

module.exports = {
  createLidStatusSchema,
  updateLidStatusSchema,
};
