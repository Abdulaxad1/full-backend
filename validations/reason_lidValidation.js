const Joi = require("joi");

const createReasonLidSchema = Joi.object({
  reason_lid: Joi.string().trim().required(),
});

const updateReasonLidSchema = Joi.object({
  reason_lid: Joi.string().trim().allow(null, ""),
}).min(1);

module.exports = {
  createReasonLidSchema,
  updateReasonLidSchema,
};
