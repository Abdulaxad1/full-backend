const { StudentGroup, Student, Group } = require("../models");

const include = [
  { model: Student, as: "student" },
  { model: Group, as: "group" },
];

// CREATE
const createStudentGroup = async (req, res) => {
  try {
    const item = await StudentGroup.create(req.body);

    return res.status(201).json({
      success: true,
      message: "O'quvchi guruhi muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE STUDENT GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getStudentGroups = async (req, res) => {
  try {
    const items = await StudentGroup.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET STUDENT GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getStudentGroupById = async (req, res) => {
  try {
    const item = await StudentGroup.findByPk(req.params.id, { include });

    if (!item) {
      return res.status(404).json({ success: false, message: "O'quvchi guruhi topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID STUDENT GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateStudentGroup = async (req, res) => {
  try {
    const item = await StudentGroup.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "O'quvchi guruhi topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "O'quvchi guruhi muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE STUDENT GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteStudentGroup = async (req, res) => {
  try {
    const item = await StudentGroup.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "O'quvchi guruhi topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "O'quvchi guruhi muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE STUDENT GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudentGroup,
  getStudentGroups,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup,
};
