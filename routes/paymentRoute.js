const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createPaymentSchema, updatePaymentSchema } = require("../validations/paymentValidation");

/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: To'lov boshqaruvi endpointlari
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *             properties:
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-31"
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-05"
 *               price:
 *                 type: number
 *                 example: 150000
 *               is_paid:
 *                 type: boolean
 *                 example: false
 *               total_attent:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       201:
 *         description: To'lov muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createPaymentSchema), createPayment);

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payment records
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: To'lov list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getPayments);

/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Get payment by id
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: To'lov found
 *       404:
 *         description: To'lov not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getPaymentById);

/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Update payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-31"
 *               payment_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-05"
 *               price:
 *                 type: number
 *                 example: 150000
 *               is_paid:
 *                 type: boolean
 *                 example: false
 *               total_attent:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       200:
 *         description: To'lov updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: To'lov not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updatePaymentSchema), updatePayment);

/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: To'lov deleted successfully
 *       404:
 *         description: To'lov not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deletePayment);

module.exports = router;
