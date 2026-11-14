const express = require("express");
const router = express.Router();

const {
  createLid,
  getLids,
  getLidById,
  updateLid,
  searchLid,
  deleteLid,
} = require("../controllers/lidController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createLidSchema, updateLidSchema } = require("../validations/lidValidation");

/**
 * @swagger
 * tags:
 *   - name: Lid
 *     description: Lid boshqaruvi endpointlari
 */

/**
 * @swagger
 * /lid:
 *   post:
 *     summary: Create lid
 *     tags: [Lid]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Sardor"
 *               last_name:
 *                 type: string
 *                 example: "Karimov"
 *               phone_number:
 *                 type: string
 *                 example: "+998901234567"
 *               lid_stage_id:
 *                 type: integer
 *                 example: 1
 *               test_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-15"
 *               trial_lesson_date:
 *                 type: integer
 *                 example: 1
 *               trial_lesson_time:
 *                 type: string
 *                 example: "18:00"
 *               trial_lesson_group_id:
 *                 type: integer
 *                 example: 1
 *               lid_status_id:
 *                 type: integer
 *                 example: 1
 *               cancel_reson_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Lid muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createLidSchema), createLid);

/**
 * @swagger
 * /lid/search:
 *   get:
 *     summary: Search lid records
 *     tags: [Lid]
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

router.get("/search", searchLid);

/**
 * @swagger
 * /lid:
 *   get:
 *     summary: Get all lid records
 *     tags: [Lid]
 *     responses:
 *       200:
 *         description: Lid list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getLids);

/**
 * @swagger
 * /lid/{id}:
 *   get:
 *     summary: Get lid by id
 *     tags: [Lid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lid found
 *       404:
 *         description: Lid not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getLidById);

/**
 * @swagger
 * /lid/{id}:
 *   put:
 *     summary: Update lid
 *     tags: [Lid]
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
 *               first_name:
 *                 type: string
 *                 example: "Sardor"
 *               last_name:
 *                 type: string
 *                 example: "Karimov"
 *               phone_number:
 *                 type: string
 *                 example: "+998901234567"
 *               lid_stage_id:
 *                 type: integer
 *                 example: 1
 *               test_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-15"
 *               trial_lesson_date:
 *                 type: integer
 *                 example: 1
 *               trial_lesson_time:
 *                 type: string
 *                 example: "18:00"
 *               trial_lesson_group_id:
 *                 type: integer
 *                 example: 1
 *               lid_status_id:
 *                 type: integer
 *                 example: 1
 *               cancel_reson_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Lid updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Lid not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateLidSchema), updateLid);

/**
 * @swagger
 * /lid/{id}:
 *   delete:
 *     summary: Delete lid
 *     tags: [Lid]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lid deleted successfully
 *       404:
 *         description: Lid not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteLid);

module.exports = router;
