const { Payment, Student } = require("../models");

const include = [
  { model: Student, as: "student" },
];

// CREATE
const createPayment = async (req, res) => {
  try {
    const item = await Payment.create(req.body);

    return res.status(201).json({
      success: true,
      message: "To'lov muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getPayments = async (req, res) => {
  try {
    const items = await Payment.findAll({ include, order: [["id", "DESC"]] });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET PAYMENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getPaymentById = async (req, res) => {
  try {
    const item = await Payment.findByPk(req.params.id, { include });

    if (!item) {
      return res.status(404).json({ success: false, message: "To'lov topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BY ID PAYMENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updatePayment = async (req, res) => {
  try {
    const item = await Payment.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "To'lov topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "To'lov muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE PAYMENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deletePayment = async (req, res) => {
  try {
    const item = await Payment.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "To'lov topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "To'lov muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE PAYMENT ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
