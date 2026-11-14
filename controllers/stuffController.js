const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Stuff, Group, GroupStuff, Role, StuffRole } = require("../models");

// parol hech qachon javobda qaytarilmaydi
const SAFE = { exclude: ["parol"] };

const withoutParol = (item) => {
  const data = item.toJSON();
  delete data.parol;
  return data;
};

// REGISTER (xodim ro'yxatdan o'tkazish)
const registerStuff = async (req, res) => {
  try {
    const existing = await Stuff.findOne({ where: { login: req.body.login } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Bu login bilan xodim allaqachon mavjud",
      });
    }

    const hashedParol = await bcrypt.hash(req.body.parol, 10);

    const item = await Stuff.create({ ...req.body, parol: hashedParol });

    return res.status(201).json({
      success: true,
      message: "Xodim muvaffaqiyatli ro'yxatdan o'tdi",
      data: withoutParol(item),
    });
  } catch (error) {
    console.error("REGISTER STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
const loginStuff = async (req, res) => {
  try {
    const { login, parol } = req.body;

    const item = await Stuff.findOne({ where: { login } });
    if (!item) {
      return res.status(401).json({ success: false, message: "Login yoki parol noto'g'ri" });
    }

    if (!item.is_active) {
      return res.status(403).json({ success: false, message: "Xodim faol emas" });
    }

    const match = await bcrypt.compare(parol, item.parol);
    if (!match) {
      return res.status(401).json({ success: false, message: "Login yoki parol noto'g'ri" });
    }

    const token = jwt.sign(
      { id: item.id, login: item.login },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
    );

    return res.status(200).json({ success: true, message: "Muvaffaqiyatli kirildi", token });
  } catch (error) {
    console.error("LOGIN STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getStuffs = async (req, res) => {
  try {
    const items = await Stuff.findAll({ attributes: SAFE, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID uchun: belongsTo + hasMany (nested)
const includeById = [
  { model: StuffRole, as: "stuff_roles", include: [{ model: Role, as: "role" }] },
  { model: GroupStuff, as: "group_stuffs", include: [{ model: Group, as: "group" }] },
];

// GET BY ID
const getStuffById = async (req, res) => {
  try {
    const item = await Stuff.findByPk(req.params.id, { attributes: SAFE, include: includeById });

    if (!item) {
      return res.status(404).json({ success: false, message: "Xodim topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateStuff = async (req, res) => {
  try {
    const item = await Stuff.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Xodim topilmadi" });
    }

    const data = { ...req.body };
    if (data.parol) {
      data.parol = await bcrypt.hash(data.parol, 10);
    }

    await item.update(data);

    return res.status(200).json({
      success: true,
      message: "Xodim muvaffaqiyatli yangilandi",
      data: withoutParol(item),
    });
  } catch (error) {
    console.error("UPDATE STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchStuff = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Stuff.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${query}%` } },
          { last_name: { [Op.iLike]: `%${query}%` } },
          { phone_number: { [Op.iLike]: `%${query}%` } },
          { login: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: SAFE,
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday xodim topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteStuff = async (req, res) => {
  try {
    const item = await Stuff.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Xodim topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Xodim muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE STUFF ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerStuff,
  loginStuff,
  getStuffs,
  getStuffById,
  updateStuff,
  searchStuff,
  deleteStuff,
};
