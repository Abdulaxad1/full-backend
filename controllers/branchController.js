const { Op } = require("sequelize");
const { Branch, Group, Stage } = require("../models");

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  { model: Group, as: "groups", include: [{ model: Stage, as: "stage" }] },
];

// CREATE
const createBranch = async (req, res) => {
  try {
    const item = await Branch.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Filial muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE BRANCH ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getBranches = async (req, res) => {
  try {
    const items = await Branch.findAll({ order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET BRANCH ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getBranchById = async (req, res) => {
  try {
    const item = await Branch.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Filial topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID BRANCH ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateBranch = async (req, res) => {
  try {
    const item = await Branch.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Filial topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Filial muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE BRANCH ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchBranch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Branch.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },,
          { address: { [Op.iLike]: `%${query}%` } },,
          { call_number: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Filial topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH BRANCH ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteBranch = async (req, res) => {
  try {
    const item = await Branch.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Filial topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Filial muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE BRANCH ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  searchBranch,
  deleteBranch,
};
