const { Op } = require("sequelize");
const { Role, Stuff, StuffRole } = require("../models");

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  { model: StuffRole, as: "stuff_roles", include: [{ model: Stuff, as: "stuff", attributes: { exclude: ["parol"] } }] },
];

// CREATE
const createRole = async (req, res) => {
  try {
    const item = await Role.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Rol muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getRoles = async (req, res) => {
  try {
    const items = await Role.findAll({ order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getRoleById = async (req, res) => {
  try {
    const item = await Role.findByPk(req.params.id, { include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Rol topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateRole = async (req, res) => {
  try {
    const item = await Role.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Rol topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Rol muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchRole = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Role.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday Rol topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteRole = async (req, res) => {
  try {
    const item = await Role.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Rol topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Rol muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  searchRole,
  deleteRole,
};
