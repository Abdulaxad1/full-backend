const { Op } = require("sequelize");
const {
  Student,
  Lid,
  Stage,
  Group,
  Branch,
  LidStatus,
  ReasonLid,
  Lesson,
  Payment,
  StudentGroup,
  StudentLesson,
} = require("../models");

const include = [
  {
    model: Lid,
    as: "lid",
    include: [
      { model: Stage, as: "stage" },
      {
        model: Group,
        as: "trial_group",
        include: [
          { model: Stage, as: "stage" },
          { model: Branch, as: "branch" },
        ],
      },
      { model: LidStatus, as: "status" },
      { model: ReasonLid, as: "cancel_reason" },
    ],
  },
];
const includeById = [
  ...include,
  {
    model: StudentGroup,
    as: "student_groups",
    include: [
      {
        model: Group,
        as: "group",
        include: [
          { model: Stage, as: "stage" },
          { model: Branch, as: "branch" },
        ],
      },
    ],
  },
  {
    model: StudentLesson,
    as: "student_lessons",
    include: [
      {
        model: Lesson,
        as: "lesson",
        include: [
          {
            model: Group,
            as: "group",
            include: [
              { model: Stage, as: "stage" },
              { model: Branch, as: "branch" },
            ],
          },
        ],
      },
    ],
  },
  { model: Payment, as: "payments" },
];

// CREATE
const createStudent = async (req, res) => {
  try {
    const item = await Student.create(req.body);

    return res.status(201).json({
      success: true,
      message: "O'quvchi muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getStudents = async (req, res) => {
  try {
    const items = await Student.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET STUDENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getStudentById = async (req, res) => {
  try {
    const item = await Student.findByPk(req.params.id, {
      include: includeById,
    });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "O'quvchi topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID STUDENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateStudent = async (req, res) => {
  try {
    const item = await Student.findByPk(req.params.id);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "O'quvchi topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "O'quvchi muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchStudent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid search query" });
    }

    const result = await Student.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${query}%` } },
          { last_name: { [Op.iLike]: `%${query}%` } },
          { phone_number: { [Op.iLike]: `%${query}%` } },
          { gender: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include,
    });

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Bunday O'quvchi topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH STUDENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteStudent = async (req, res) => {
  try {
    const item = await Student.findByPk(req.params.id);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "O'quvchi topilmadi" });
    }

    await item.destroy();

    return res
      .status(200)
      .json({ success: true, message: "O'quvchi muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  searchStudent,
  deleteStudent,
};
