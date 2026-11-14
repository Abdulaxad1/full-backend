const { Op } = require("sequelize");
const { StudentLesson, Lesson, Student } = require("../models");

const include = [
  { model: Lesson, as: "lesson" },
  { model: Student, as: "student" },
];

// CREATE
const createStudentLesson = async (req, res) => {
  try {
    const item = await StudentLesson.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Davomat muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE STUDENT LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getStudentLessons = async (req, res) => {
  try {
    const items = await StudentLesson.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET STUDENT LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getStudentLessonById = async (req, res) => {
  try {
    const item = await StudentLesson.findByPk(req.params.id, { include });

    if (!item) {
      return res.status(404).json({ success: false, message: "Davomat topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID STUDENT LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateStudentLesson = async (req, res) => {
  try {
    const item = await StudentLesson.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Davomat topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Davomat muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE STUDENT LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchStudentLesson = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await StudentLesson.findAll({
      where: {
        [Op.or]: [
          { reason: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include,
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Davomat topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH STUDENT LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteStudentLesson = async (req, res) => {
  try {
    const item = await StudentLesson.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Davomat topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Davomat muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE STUDENT LESSON ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudentLesson,
  getStudentLessons,
  getStudentLessonById,
  updateStudentLesson,
  searchStudentLesson,
  deleteStudentLesson,
};
