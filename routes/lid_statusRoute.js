const express = require("express");
const router = express.Router();

const {
  createLidStatus,
  getLidStatuses,
  getLidStatusById,
  updateLidStatus,
  searchLidStatus,
  deleteLidStatus,
} = require("../controllers/lid_statusController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createLidStatusSchema, updateLidStatusSchema } = require("../validations/lid_statusValidation");

/**
 * @swagger
 * tags:
 *   - name: LidStatus
 *     description: Lid holati boshqaruvi endpointlari
 */

/**
 * @swagger
 * /lid-status:
 *   post:
 *     summary: Create lid status
 *     tags: [LidStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Yangi"
 *     responses:
 *       201:
 *         description: Lid holati muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createLidStatusSchema), createLidStatus);

/**
 * @swagger
 * /lid-status/search:
 *   get:
 *     summary: Search lid status records
 *     tags: [LidStatus]
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

router.get("/search", searchLidStatus);

/**
 * @swagger
 * /lid-status:
 *   get:
 *     summary: Get all lid status records
 *     tags: [LidStatus]
 *     responses:
 *       200:
 *         description: Lid holati list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getLidStatuses);

/**
 * @swagger
 * /lid-status/{id}:
 *   get:
 *     summary: Get lid status by id
 *     tags: [LidStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lid holati found
 *       404:
 *         description: Lid holati not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getLidStatusById);

/**
 * @swagger
 * /lid-status/{id}:
 *   put:
 *     summary: Update lid status
 *     tags: [LidStatus]
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
 *               status:
 *                 type: string
 *                 example: "Yangi"
 *     responses:
 *       200:
 *         description: Lid holati updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Lid holati not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateLidStatusSchema), updateLidStatus);

/**
 * @swagger
 * /lid-status/{id}:
 *   delete:
 *     summary: Delete lid status
 *     tags: [LidStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lid holati deleted successfully
 *       404:
 *         description: Lid holati not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteLidStatus);

module.exports = router;
