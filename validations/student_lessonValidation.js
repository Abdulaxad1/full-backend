const Joi = require("joi");

const createStudentLessonSchema = Joi.object({
  lesson_id: Joi.number().integer().required(),
  student_id: Joi.number().integer().required(),
  is_there: Joi.boolean().allow(null).optional(),
  reason: Joi.string().trim().allow(null, "").optional(),
  be_paid: Joi.boolean().allow(null).optional(),
});

const updateStudentLessonSchema = Joi.object({
  lesson_id: Joi.number().integer().allow(null),
  student_id: Joi.number().integer().allow(null),
  is_there: Joi.boolean().allow(null),
  reason: Joi.string().trim().allow(null, ""),
  be_paid: Joi.boolean().allow(null),
}).min(1);

module.exports = {
  createStudentLessonSchema,
  updateStudentLessonSchema,
};
