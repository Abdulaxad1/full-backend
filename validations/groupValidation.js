const Joi = require("joi");

const createGroupSchema = Joi.object({
  group_name: Joi.string().trim().required(),
  lesson_start_time: Joi.string().trim().allow(null, "").optional(),
  lesson_continuous: Joi.string().trim().allow(null, "").optional(),
  lesson_week_day: Joi.string().trim().allow(null, "").optional(),
  group_stage_id: Joi.number().integer().allow(null).optional(),
  room_number: Joi.string().trim().allow(null, "").optional(),
  room_floor: Joi.number().integer().allow(null).optional(),
  branch_id: Joi.number().integer().allow(null).optional(),
  lessons_quant: Joi.number().integer().allow(null).optional(),
  is_active: Joi.boolean().allow(null).optional(),
});

const updateGroupSchema = Joi.object({
  group_name: Joi.string().trim().allow(null, ""),
  lesson_start_time: Joi.string().trim().allow(null, ""),
  lesson_continuous: Joi.string().trim().allow(null, ""),
  lesson_week_day: Joi.string().trim().allow(null, ""),
  group_stage_id: Joi.number().integer().allow(null),
  room_number: Joi.string().trim().allow(null, ""),
  room_floor: Joi.number().integer().allow(null),
  branch_id: Joi.number().integer().allow(null),
  lessons_quant: Joi.number().integer().allow(null),
  is_active: Joi.boolean().allow(null),
}).min(1);

module.exports = {
  createGroupSchema,
  updateGroupSchema,
};
