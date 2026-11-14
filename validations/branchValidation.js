const Joi = require("joi");

const createBranchSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().allow(null, "").optional(),
  call_number: Joi.string().trim().allow(null, "").optional(),
});

const updateBranchSchema = Joi.object({
  name: Joi.string().trim().allow(null, ""),
  address: Joi.string().trim().allow(null, ""),
  call_number: Joi.string().trim().allow(null, ""),
}).min(1);

module.exports = {
  createBranchSchema,
  updateBranchSchema,
};
