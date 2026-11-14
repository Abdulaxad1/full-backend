const { Op } = require("sequelize");
const { Stage, Branch, Group, Lid, LidStatus, ReasonLid } = require("../models");

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  { model: Group, as: "groups", include: [{ model: Branch, as: "branch" }] },
  { model: Lid, as: "lids", include: [{ model: Group, as: "trial_group" }, { model: LidStatus, as: "status" }, { model: ReasonLid, as: "cancel_reason" }] },
];

// CREATE
const createStage = async (req, res) => {
  try {
    const item = await Stage.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Bosqich muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE STAGE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getStages = async (req, res) => {
  try {
    const items = await Stage.findAll({ order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET STAGE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getStageById = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Bosqich topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID STAGE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateStage = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Bosqich topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Bosqich muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE STAGE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchStage = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Stage.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Bosqich topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH STAGE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteStage = async (req, res) => {
  try {
    const item = await Stage.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Bosqich topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Bosqich muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE STAGE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStage,
  getStages,
  getStageById,
  updateStage,
  searchStage,
  deleteStage,
};
