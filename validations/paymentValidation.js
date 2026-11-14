const Joi = require("joi");

const createPaymentSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  payment_last_date: Joi.date().iso().allow(null).optional(),
  payment_date: Joi.date().iso().allow(null).optional(),
  price: Joi.number().precision(2).min(0).allow(null).optional(),
  is_paid: Joi.boolean().allow(null).optional(),
  total_attent: Joi.number().integer().allow(null).optional(),
});

const updatePaymentSchema = Joi.object({
  student_id: Joi.number().integer().allow(null),
  payment_last_date: Joi.date().iso().allow(null),
  payment_date: Joi.date().iso().allow(null),
  price: Joi.number().precision(2).min(0).allow(null),
  is_paid: Joi.boolean().allow(null),
  total_attent: Joi.number().integer().allow(null),
}).min(1);

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};
