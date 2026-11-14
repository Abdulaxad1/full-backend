const Joi = require("joi");

const createLessonSchema = Joi.object({
  lesson_theme: Joi.string().trim().allow(null, "").optional(),
  lesson_number: Joi.number().integer().allow(null).optional(),
  group_id: Joi.number().integer().required(),
  lesson_date: Joi.date().iso().allow(null).optional(),
});

const updateLessonSchema = Joi.object({
  lesson_theme: Joi.string().trim().allow(null, ""),
  lesson_number: Joi.number().integer().allow(null),
  group_id: Joi.number().integer().allow(null),
  lesson_date: Joi.date().iso().allow(null),
}).min(1);

module.exports = {
  createLessonSchema,
  updateLessonSchema,
};
