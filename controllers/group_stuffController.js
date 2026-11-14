const { GroupStuff, Group, Stuff } = require("../models");

const include = [
  { model: Group, as: "group" },
  { model: Stuff, as: "stuff", attributes: { exclude: ["parol"] } },
];

// CREATE
const createGroupStuff = async (req, res) => {
  try {
    const item = await GroupStuff.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Guruh xodimi muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE GROUP STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getGroupStuffs = async (req, res) => {
  try {
    const items = await GroupStuff.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET GROUP STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getGroupStuffById = async (req, res) => {
  try {
    const item = await GroupStuff.findByPk(req.params.id, { include });

    if (!item) {
      return res.status(404).json({ success: false, message: "Guruh xodimi topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID GROUP STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateGroupStuff = async (req, res) => {
  try {
    const item = await GroupStuff.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Guruh xodimi topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Guruh xodimi muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE GROUP STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteGroupStuff = async (req, res) => {
  try {
    const item = await GroupStuff.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Guruh xodimi topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Guruh xodimi muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE GROUP STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createGroupStuff,
  getGroupStuffs,
  getGroupStuffById,
  updateGroupStuff,
  deleteGroupStuff,
};
