const express = require("express");
const router = express.Router();

const {
  createReasonLid,
  getReasonLids,
  getReasonLidById,
  updateReasonLid,
  searchReasonLid,
  deleteReasonLid,
} = require("../controllers/reason_lidController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createReasonLidSchema, updateReasonLidSchema } = require("../validations/reason_lidValidation");

/**
 * @swagger
 * tags:
 *   - name: ReasonLid
 *     description: Sabab boshqaruvi endpointlari
 */

/**
 * @swagger
 * /reason-lid:
 *   post:
 *     summary: Create reason lid
 *     tags: [ReasonLid]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason_lid
 *             properties:
 *               reason_lid:
 *                 type: string
 *                 example: "Narx qimmat"
 *     responses:
 *       201:
 *         description: Sabab muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createReasonLidSchema), createReasonLid);

/**
 * @swagger
 * /reason-lid/search:
 *   get:
 *     summary: Search reason lid records
 *     tags: [ReasonLid]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "a"
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing or invalid search query
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/search", searchReasonLid);

/**
 * @swagger
 * /reason-lid:
 *   get:
 *     summary: Get all reason lid records
 *     tags: [ReasonLid]
 *     responses:
 *       200:
 *         description: Sabab list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getReasonLids);

/**
 * @swagger
 * /reason-lid/{id}:
 *   get:
 *     summary: Get reason lid by id
 *     tags: [ReasonLid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sabab found
 *       404:
 *         description: Sabab not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getReasonLidById);

/**
 * @swagger
 * /reason-lid/{id}:
 *   put:
 *     summary: Update reason lid
 *     tags: [ReasonLid]
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
 *               reason_lid:
 *                 type: string
 *                 example: "Narx qimmat"
 *     responses:
 *       200:
 *         description: Sabab updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Sabab not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateReasonLidSchema), updateReasonLid);

/**
 * @swagger
 * /reason-lid/{id}:
 *   delete:
 *     summary: Delete reason lid
 *     tags: [ReasonLid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sabab deleted successfully
 *       404:
 *         description: Sabab not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteReasonLid);

module.exports = router;
