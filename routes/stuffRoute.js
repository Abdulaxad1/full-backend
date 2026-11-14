const express = require("express");
const router = express.Router();

const {
  registerStuff,
  loginStuff,
  getStuffs,
  getStuffById,
  updateStuff,
  searchStuff,
  deleteStuff,
} = require("../controllers/stuffController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createStuffSchema,
  updateStuffSchema,
  loginStuffSchema,
} = require("../validations/stuffValidation");

/**
 * @swagger
 * tags:
 *   - name: Stuff
 *     description: Xodimlar boshqaruvi endpointlari
 */

/**
 * @swagger
 * /stuff/register:
 *   post:
 *     summary: Register new stuff
 *     tags: [Stuff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - login
 *               - parol
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Ali"
 *               last_name:
 *                 type: string
 *                 example: "Valiyev"
 *               phone_number:
 *                 type: string
 *                 example: "+998901234567"
 *               login:
 *                 type: string
 *                 example: "ali_xodim"
 *               parol:
 *                 type: string
 *                 example: "parol123"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Xodim muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/register", validateSchema(createStuffSchema), registerStuff);

/**
 * @swagger
 * /stuff/login:
 *   post:
 *     summary: Login stuff (JWT token olish)
 *     tags: [Stuff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - parol
 *             properties:
 *               login:
 *                 type: string
 *                 example: "ali_xodim"
 *               parol:
 *                 type: string
 *                 example: "parol123"
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirildi
 *       400:
 *         description: Validation error
 *       401:
 *         description: Login yoki parol noto'g'ri
 *       403:
 *         description: Xodim faol emas
 *       500:
 *         description: Server error
 */

router.post("/login", validateSchema(loginStuffSchema), loginStuff);

/**
 * @swagger
 * /stuff/search:
 *   get:
 *     summary: Search stuff records
 *     tags: [Stuff]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "ali"
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

router.get("/search", searchStuff);

/**
 * @swagger
 * /stuff:
 *   get:
 *     summary: Get all stuff records
 *     tags: [Stuff]
 *     responses:
 *       200:
 *         description: Xodimlar ro'yxati
 *       500:
 *         description: Server error
 */

router.get("/", getStuffs);

/**
 * @swagger
 * /stuff/{id}:
 *   get:
 *     summary: Get stuff by id
 *     tags: [Stuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Xodim topildi
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Server error
 */

router.get("/:id", getStuffById);

/**
 * @swagger
 * /stuff/{id}:
 *   put:
 *     summary: Update stuff
 *     tags: [Stuff]
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
 *                 example: "Ali"
 *               last_name:
 *                 type: string
 *                 example: "Valiyev"
 *               phone_number:
 *                 type: string
 *                 example: "+998901234567"
 *               login:
 *                 type: string
 *                 example: "ali_xodim"
 *               parol:
 *                 type: string
 *                 example: "parol123"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Xodim yangilandi
 *       400:
 *         description: Validation error
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateStuffSchema), updateStuff);

/**
 * @swagger
 * /stuff/{id}:
 *   delete:
 *     summary: Delete stuff
 *     tags: [Stuff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Xodim o'chirildi
 *       404:
 *         description: Xodim topilmadi
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteStuff);

module.exports = router;
