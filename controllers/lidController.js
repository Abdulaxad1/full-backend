const { Op } = require("sequelize");
const { Lid, Stage, Group, LidStatus, ReasonLid, Student } = require("../models");

const include = [
  { model: Stage, as: "stage" },
  { model: Group, as: "trial_group" },
  { model: LidStatus, as: "status" },
  { model: ReasonLid, as: "cancel_reason" },
];

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  ...include,
  { model: Student, as: "students" },
];

// CREATE
const createLid = async (req, res) => {
  try {
    const item = await Lid.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Lid muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getLids = async (req, res) => {
  try {
    const items = await Lid.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getLidById = async (req, res) => {
  try {
    const item = await Lid.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Lid topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateLid = async (req, res) => {
  try {
    const item = await Lid.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lid topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Lid muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchLid = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Lid.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${query}%` } },,
          { last_name: { [Op.iLike]: `%${query}%` } },,
          { phone_number: { [Op.iLike]: `%${query}%` } },,
          { trial_lesson_time: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include,
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Lid topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteLid = async (req, res) => {
  try {
    const item = await Lid.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lid topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Lid muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLid,
  getLids,
  getLidById,
  updateLid,
  searchLid,
  deleteLid,
};
