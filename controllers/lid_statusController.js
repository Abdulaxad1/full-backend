const { Op } = require("sequelize");
const { LidStatus, Group, Lid, ReasonLid, Stage } = require("../models");

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  { model: Lid, as: "lids", include: [{ model: Stage, as: "stage" }, { model: Group, as: "trial_group" }, { model: ReasonLid, as: "cancel_reason" }] },
];

// CREATE
const createLidStatus = async (req, res) => {
  try {
    const item = await LidStatus.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Lid holati muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE LID STATUS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getLidStatuses = async (req, res) => {
  try {
    const items = await LidStatus.findAll({ order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET LID STATUS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getLidStatusById = async (req, res) => {
  try {
    const item = await LidStatus.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Lid holati topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID LID STATUS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateLidStatus = async (req, res) => {
  try {
    const item = await LidStatus.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lid holati topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Lid holati muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE LID STATUS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchLidStatus = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await LidStatus.findAll({
      where: {
        [Op.or]: [
          { status: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Lid holati topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH LID STATUS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteLidStatus = async (req, res) => {
  try {
    const item = await LidStatus.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lid holati topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Lid holati muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE LID STATUS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLidStatus,
  getLidStatuses,
  getLidStatusById,
  updateLidStatus,
  searchLidStatus,
  deleteLidStatus,
};
