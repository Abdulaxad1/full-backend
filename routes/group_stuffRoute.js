const express = require("express");
const router = express.Router();

const {
  createGroupStuff,
  getGroupStuffs,
  getGroupStuffById,
  updateGroupStuff,
  deleteGroupStuff,
} = require("../controllers/group_stuffController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createGroupStuffSchema, updateGroupStuffSchema } = require("../validations/group_stuffValidation");

/**
 * @swagger
 * tags:
 *   - name: GroupStuff
 *     description: Guruh xodimi boshqaruvi endpointlari
 */

/**
 * @swagger
 * /group-stuff:
 *   post:
 *     summary: Create group stuff
 *     tags: [GroupStuff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_id
 *               - stuff_id
 *             properties:
 *               group_id:
 *                 type: integer
 *                 example: 1
 *               stuff_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Guruh xodimi muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createGroupStuffSchema), createGroupStuff);

/**
 * @swagger
 * /group-stuff:
 *   get:
 *     summary: Get all group stuff records
 *     tags: [GroupStuff]
 *     responses:
 *       200:
 *         description: Guruh xodimi list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getGroupStuffs);

/**
 * @swagger
 * /group-stuff/{id}:
 *   get:
 *     summary: Get group stuff by id
 *     tags: [GroupStuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Guruh xodimi found
 *       404:
 *         description: Guruh xodimi not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getGroupStuffById);

/**
 * @swagger
 * /group-stuff/{id}:
 *   put:
 *     summary: Update group stuff
 *     tags: [GroupStuff]
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
 *               group_id:
 *                 type: integer
 *                 example: 1
 *               stuff_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Guruh xodimi updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Guruh xodimi not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateGroupStuffSchema), updateGroupStuff);

/**
 * @swagger
 * /group-stuff/{id}:
 *   delete:
 *     summary: Delete group stuff
 *     tags: [GroupStuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Guruh xodimi deleted successfully
 *       404:
 *         description: Guruh xodimi not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteGroupStuff);

module.exports = router;
