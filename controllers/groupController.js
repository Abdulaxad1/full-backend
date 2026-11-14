const { Op } = require("sequelize");
const { Group, Stage, Branch, GroupStuff, Lesson, Lid, LidStatus, ReasonLid, Student, StudentGroup, Stuff } = require("../models");

const include = [
  { model: Stage, as: "stage" },
  { model: Branch, as: "branch" },
];

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  ...include,
  { model: GroupStuff, as: "group_stuffs", include: [{ model: Stuff, as: "stuff", attributes: { exclude: ["parol"] } }] },
  { model: Lid, as: "trial_lids", include: [{ model: Stage, as: "stage" }, { model: LidStatus, as: "status" }, { model: ReasonLid, as: "cancel_reason" }] },
  { model: StudentGroup, as: "student_groups", include: [{ model: Student, as: "student" }] },
  { model: Lesson, as: "lessons" },
];

// CREATE
const createGroup = async (req, res) => {
  try {
    const item = await Group.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Guruh muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getGroups = async (req, res) => {
  try {
    const items = await Group.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getGroupById = async (req, res) => {
  try {
    const item = await Group.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Guruh topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateGroup = async (req, res) => {
  try {
    const item = await Group.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Guruh topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Guruh muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchGroup = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Group.findAll({
      where: {
        [Op.or]: [
          { group_name: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include,
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Guruh topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteGroup = async (req, res) => {
  try {
    const item = await Group.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Guruh topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Guruh muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE GROUP ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  searchGroup,
  deleteGroup,
};
