const Joi = require("joi");

const createLidSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().allow(null, "").optional(),
  phone_number: Joi.string().trim().allow(null, "").optional(),
  lid_stage_id: Joi.number().integer().allow(null).optional(),
  test_date: Joi.date().iso().allow(null).optional(),
  trial_lesson_date: Joi.number().integer().allow(null).optional(),
  trial_lesson_time: Joi.string().trim().allow(null, "").optional(),
  trial_lesson_group_id: Joi.number().integer().allow(null).optional(),
  lid_status_id: Joi.number().integer().allow(null).optional(),
  cancel_reson_id: Joi.number().integer().allow(null).optional(),
});

const updateLidSchema = Joi.object({
  first_name: Joi.string().trim().allow(null, ""),
  last_name: Joi.string().trim().allow(null, ""),
  phone_number: Joi.string().trim().allow(null, ""),
  lid_stage_id: Joi.number().integer().allow(null),
  test_date: Joi.date().iso().allow(null),
  trial_lesson_date: Joi.number().integer().allow(null),
  trial_lesson_time: Joi.string().trim().allow(null, ""),
  trial_lesson_group_id: Joi.number().integer().allow(null),
  lid_status_id: Joi.number().integer().allow(null),
  cancel_reson_id: Joi.number().integer().allow(null),
}).min(1);

module.exports = {
  createLidSchema,
  updateLidSchema,
};
