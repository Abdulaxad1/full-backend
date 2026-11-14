const { StuffRole, Stuff, Role } = require("../models");

const include = [
  { model: Stuff, as: "stuff", attributes: { exclude: ["parol"] } },
  { model: Role, as: "role" },
];

// CREATE
const createStuffRole = async (req, res) => {
  try {
    const item = await StuffRole.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Xodim roli muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE STUFF ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getStuffRoles = async (req, res) => {
  try {
    const items = await StuffRole.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET STUFF ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getStuffRoleById = async (req, res) => {
  try {
    const item = await StuffRole.findByPk(req.params.id, { include });

    if (!item) {
      return res.status(404).json({ success: false, message: "Xodim roli topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID STUFF ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateStuffRole = async (req, res) => {
  try {
    const item = await StuffRole.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Xodim roli topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Xodim roli muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE STUFF ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteStuffRole = async (req, res) => {
  try {
    const item = await StuffRole.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Xodim roli topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Xodim roli muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE STUFF ROLE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStuffRole,
  getStuffRoles,
  getStuffRoleById,
  updateStuffRole,
  deleteStuffRole,
};
