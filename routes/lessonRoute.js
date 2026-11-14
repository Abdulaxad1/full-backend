const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  searchLesson,
  deleteLesson,
} = require("../controllers/lessonController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createLessonSchema, updateLessonSchema } = require("../validations/lessonValidation");

/**
 * @swagger
 * tags:
 *   - name: Lesson
 *     description: Dars boshqaruvi endpointlari
 */

/**
 * @swagger
 * /lesson:
 *   post:
 *     summary: Create lesson
 *     tags: [Lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - group_id
 *             properties:
 *               lesson_theme:
 *                 type: string
 *                 example: "Kirish darsi"
 *               lesson_number:
 *                 type: integer
 *                 example: 1
 *               group_id:
 *                 type: integer
 *                 example: 1
 *               lesson_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-15"
 *     responses:
 *       201:
 *         description: Dars muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createLessonSchema), createLesson);

/**
 * @swagger
 * /lesson/search:
 *   get:
 *     summary: Search lesson records
 *     tags: [Lesson]
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

router.get("/search", searchLesson);

/**
 * @swagger
 * /lesson:
 *   get:
 *     summary: Get all lesson records
 *     tags: [Lesson]
 *     responses:
 *       200:
 *         description: Dars list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getLessons);

/**
 * @swagger
 * /lesson/{id}:
 *   get:
 *     summary: Get lesson by id
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Dars found
 *       404:
 *         description: Dars not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getLessonById);

/**
 * @swagger
 * /lesson/{id}:
 *   put:
 *     summary: Update lesson
 *     tags: [Lesson]
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
 *               lesson_theme:
 *                 type: string
 *                 example: "Kirish darsi"
 *               lesson_number:
 *                 type: integer
 *                 example: 1
 *               group_id:
 *                 type: integer
 *                 example: 1
 *               lesson_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-15"
 *     responses:
 *       200:
 *         description: Dars updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Dars not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateLessonSchema), updateLesson);

/**
 * @swagger
 * /lesson/{id}:
 *   delete:
 *     summary: Delete lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Dars deleted successfully
 *       404:
 *         description: Dars not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteLesson);

module.exports = router;
