const { Op } = require("sequelize");
const { ReasonLid, Group, Lid, LidStatus, Stage } = require("../models");

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  { model: Lid, as: "lids", include: [{ model: Stage, as: "stage" }, { model: Group, as: "trial_group" }, { model: LidStatus, as: "status" }] },
];

// CREATE
const createReasonLid = async (req, res) => {
  try {
    const item = await ReasonLid.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Sabab muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE REASON LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getReasonLids = async (req, res) => {
  try {
    const items = await ReasonLid.findAll({ order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET REASON LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getReasonLidById = async (req, res) => {
  try {
    const item = await ReasonLid.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Sabab topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID REASON LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateReasonLid = async (req, res) => {
  try {
    const item = await ReasonLid.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Sabab topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Sabab muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE REASON LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchReasonLid = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await ReasonLid.findAll({
      where: {
        [Op.or]: [
          { reason_lid: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Sabab topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH REASON LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteReasonLid = async (req, res) => {
  try {
    const item = await ReasonLid.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Sabab topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Sabab muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE REASON LID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReasonLid,
  getReasonLids,
  getReasonLidById,
  updateReasonLid,
  searchReasonLid,
  deleteReasonLid,
};
