const { Op } = require("sequelize");
const { Lesson, Group, Student, StudentLesson } = require("../models");

const include = [
  { model: Group, as: "group" },
];

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  ...include,
  { model: StudentLesson, as: "student_lessons", include: [{ model: Student, as: "student" }] },
];

// CREATE
const createLesson = async (req, res) => {
  try {
    const item = await Lesson.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Dars muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getLessons = async (req, res) => {
  try {
    const items = await Lesson.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getLessonById = async (req, res) => {
  try {
    const item = await Lesson.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Dars topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateLesson = async (req, res) => {
  try {
    const item = await Lesson.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Dars topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Dars muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchLesson = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Lesson.findAll({
      where: {
        [Op.or]: [
          { lesson_theme: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include,
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Dars topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteLesson = async (req, res) => {
  try {
    const item = await Lesson.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Dars topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Dars muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  searchLesson,
  deleteLesson,
};
