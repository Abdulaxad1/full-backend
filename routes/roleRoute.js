const express = require("express");
const router = express.Router();

const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  searchRole,
  deleteRole,
} = require("../controllers/roleController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createRoleSchema, updateRoleSchema } = require("../validations/roleValidation");

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Rol boshqaruvi endpointlari
 */

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create role
 *     tags: [Role]
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
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: Rol muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createRoleSchema), createRole);

/**
 * @swagger
 * /role/search:
 *   get:
 *     summary: Search role records
 *     tags: [Role]
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

router.get("/search", searchRole);

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all role records
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: Rol list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getRoles);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Rol found
 *       404:
 *         description: Rol not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getRoleById);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Role]
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
 *                 example: "Admin"
 *     responses:
 *       200:
 *         description: Rol updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Rol not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateRoleSchema), updateRole);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Rol deleted successfully
 *       404:
 *         description: Rol not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteRole);

module.exports = router;
