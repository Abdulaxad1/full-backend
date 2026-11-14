const express = require("express");
const router = express.Router();

const {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  searchGroup,
  deleteGroup,
} = require("../controllers/groupController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createGroupSchema, updateGroupSchema } = require("../validations/groupValidation");

/**
 * @swagger
 * tags:
 *   - name: Group
 *     description: Guruh boshqaruvi endpointlari
 */

/**
 * @swagger
 * /group:
 *   post:
 *     summary: Create group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_name
 *             properties:
 *               group_name:
 *                 type: string
 *                 example: "Ingliz tili A1"
 *               lesson_start_time:
 *                 type: string
 *                 example: "18:00"
 *               lesson_continuous:
 *                 type: string
 *                 example: "2 soat"
 *               lesson_week_day:
 *                 type: string
 *                 example: "Dush-Chor-Juma"
 *               group_stage_id:
 *                 type: integer
 *                 example: 1
 *               room_number:
 *                 type: string
 *                 example: "12"
 *               room_floor:
 *                 type: integer
 *                 example: 2
 *               branch_id:
 *                 type: integer
 *                 example: 1
 *               lessons_quant:
 *                 type: integer
 *                 example: 24
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Guruh muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createGroupSchema), createGroup);

/**
 * @swagger
 * /group/search:
 *   get:
 *     summary: Search group records
 *     tags: [Group]
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

router.get("/search", searchGroup);

/**
 * @swagger
 * /group:
 *   get:
 *     summary: Get all group records
 *     tags: [Group]
 *     responses:
 *       200:
 *         description: Guruh list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getGroups);

/**
 * @swagger
 * /group/{id}:
 *   get:
 *     summary: Get group by id
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Guruh found
 *       404:
 *         description: Guruh not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getGroupById);

/**
 * @swagger
 * /group/{id}:
 *   put:
 *     summary: Update group
 *     tags: [Group]
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
 *               group_name:
 *                 type: string
 *                 example: "Ingliz tili A1"
 *               lesson_start_time:
 *                 type: string
 *                 example: "18:00"
 *               lesson_continuous:
 *                 type: string
 *                 example: "2 soat"
 *               lesson_week_day:
 *                 type: string
 *                 example: "Dush-Chor-Juma"
 *               group_stage_id:
 *                 type: integer
 *                 example: 1
 *               room_number:
 *                 type: string
 *                 example: "12"
 *               room_floor:
 *                 type: integer
 *                 example: 2
 *               branch_id:
 *                 type: integer
 *                 example: 1
 *               lessons_quant:
 *                 type: integer
 *                 example: 24
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Guruh updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Guruh not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateGroupSchema), updateGroup);

/**
 * @swagger
 * /group/{id}:
 *   delete:
 *     summary: Delete group
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Guruh deleted successfully
 *       404:
 *         description: Guruh not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteGroup);

module.exports = router;
