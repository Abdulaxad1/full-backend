const express = require("express");
const router = express.Router();

const {
  createStuffRole,
  getStuffRoles,
  getStuffRoleById,
  updateStuffRole,
  deleteStuffRole,
} = require("../controllers/stuff_roleController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createStuffRoleSchema, updateStuffRoleSchema } = require("../validations/stuff_roleValidation");

/**
 * @swagger
 * tags:
 *   - name: StuffRole
 *     description: Xodim roli boshqaruvi endpointlari
 */

/**
 * @swagger
 * /stuff-role:
 *   post:
 *     summary: Create stuff role
 *     tags: [StuffRole]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stuff_id
 *               - role_id
 *             properties:
 *               stuff_id:
 *                 type: integer
 *                 example: 1
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Xodim roli muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createStuffRoleSchema), createStuffRole);

/**
 * @swagger
 * /stuff-role:
 *   get:
 *     summary: Get all stuff role records
 *     tags: [StuffRole]
 *     responses:
 *       200:
 *         description: Xodim roli list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getStuffRoles);

/**
 * @swagger
 * /stuff-role/{id}:
 *   get:
 *     summary: Get stuff role by id
 *     tags: [StuffRole]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Xodim roli found
 *       404:
 *         description: Xodim roli not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getStuffRoleById);

/**
 * @swagger
 * /stuff-role/{id}:
 *   put:
 *     summary: Update stuff role
 *     tags: [StuffRole]
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
 *               stuff_id:
 *                 type: integer
 *                 example: 1
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Xodim roli updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Xodim roli not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateStuffRoleSchema), updateStuffRole);

/**
 * @swagger
 * /stuff-role/{id}:
 *   delete:
 *     summary: Delete stuff role
 *     tags: [StuffRole]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Xodim roli deleted successfully
 *       404:
 *         description: Xodim roli not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteStuffRole);

module.exports = router;
