const express = require("express");
const router = express.Router();

const {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  searchBranch,
  deleteBranch,
} = require("../controllers/branchController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createBranchSchema, updateBranchSchema } = require("../validations/branchValidation");

/**
 * @swagger
 * tags:
 *   - name: Branch
 *     description: Filial boshqaruvi endpointlari
 */

/**
 * @swagger
 * /branch:
 *   post:
 *     summary: Create branch
 *     tags: [Branch]
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
 *                 example: "Chilonzor filiali"
 *               address:
 *                 type: string
 *                 example: "Chilonzor 9-kvartal"
 *               call_number:
 *                 type: string
 *                 example: "+998712345678"
 *     responses:
 *       201:
 *         description: Filial muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createBranchSchema), createBranch);

/**
 * @swagger
 * /branch/search:
 *   get:
 *     summary: Search branch records
 *     tags: [Branch]
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

router.get("/search", searchBranch);

/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get all branch records
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Filial list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getBranches);

/**
 * @swagger
 * /branch/{id}:
 *   get:
 *     summary: Get branch by id
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Filial found
 *       404:
 *         description: Filial not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getBranchById);

/**
 * @swagger
 * /branch/{id}:
 *   put:
 *     summary: Update branch
 *     tags: [Branch]
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
 *                 example: "Chilonzor filiali"
 *               address:
 *                 type: string
 *                 example: "Chilonzor 9-kvartal"
 *               call_number:
 *                 type: string
 *                 example: "+998712345678"
 *     responses:
 *       200:
 *         description: Filial updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Filial not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateBranchSchema), updateBranch);

/**
 * @swagger
 * /branch/{id}:
 *   delete:
 *     summary: Delete branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Filial deleted successfully
 *       404:
 *         description: Filial not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteBranch);

module.exports = router;
