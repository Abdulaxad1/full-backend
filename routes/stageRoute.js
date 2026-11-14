const express = require("express");
const router = express.Router();

const {
  createStage,
  getStages,
  getStageById,
  updateStage,
  searchStage,
  deleteStage,
} = require("../controllers/stageController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createStageSchema, updateStageSchema } = require("../validations/stageValidation");

/**
 * @swagger
 * tags:
 *   - name: Stage
 *     description: Bosqich boshqaruvi endpointlari
 */

/**
 * @swagger
 * /stage:
 *   post:
 *     summary: Create stage
 *     tags: [Stage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Boshlang'ich"
 *     responses:
 *       201:
 *         description: Bosqich muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createStageSchema), createStage);

/**
 * @swagger
 * /stage/search:
 *   get:
 *     summary: Search stage records
 *     tags: [Stage]
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

router.get("/search", searchStage);

/**
 * @swagger
 * /stage:
 *   get:
 *     summary: Get all stage records
 *     tags: [Stage]
 *     responses:
 *       200:
 *         description: Bosqich list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getStages);

/**
 * @swagger
 * /stage/{id}:
 *   get:
 *     summary: Get stage by id
 *     tags: [Stage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Bosqich found
 *       404:
 *         description: Bosqich not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getStageById);

/**
 * @swagger
 * /stage/{id}:
 *   put:
 *     summary: Update stage
 *     tags: [Stage]
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
 *               name:
 *                 type: string
 *                 example: "Boshlang'ich"
 *     responses:
 *       200:
 *         description: Bosqich updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Bosqich not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateStageSchema), updateStage);

/**
 * @swagger
 * /stage/{id}:
 *   delete:
 *     summary: Delete stage
 *     tags: [Stage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Bosqich deleted successfully
 *       404:
 *         description: Bosqich not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteStage);

module.exports = router;
