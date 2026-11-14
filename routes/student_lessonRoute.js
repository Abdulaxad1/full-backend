const express = require("express");
const router = express.Router();

const {
  createStudentLesson,
  getStudentLessons,
  getStudentLessonById,
  updateStudentLesson,
  searchStudentLesson,
  deleteStudentLesson,
} = require("../controllers/student_lessonController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createStudentLessonSchema, updateStudentLessonSchema } = require("../validations/student_lessonValidation");

/**
 * @swagger
 * tags:
 *   - name: StudentLesson
 *     description: Davomat boshqaruvi endpointlari
 */

/**
 * @swagger
 * /student-lesson:
 *   post:
 *     summary: Create student lesson
 *     tags: [StudentLesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lesson_id
 *               - student_id
 *             properties:
 *               lesson_id:
 *                 type: integer
 *                 example: 1
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               is_there:
 *                 type: boolean
 *                 example: true
 *               reason:
 *                 type: string
 *                 example: "Kasal"
 *               be_paid:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Davomat muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createStudentLessonSchema), createStudentLesson);

/**
 * @swagger
 * /student-lesson/search:
 *   get:
 *     summary: Search student lesson records
 *     tags: [StudentLesson]
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

router.get("/search", searchStudentLesson);

/**
 * @swagger
 * /student-lesson:
 *   get:
 *     summary: Get all student lesson records
 *     tags: [StudentLesson]
 *     responses:
 *       200:
 *         description: Davomat list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getStudentLessons);

/**
 * @swagger
 * /student-lesson/{id}:
 *   get:
 *     summary: Get student lesson by id
 *     tags: [StudentLesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Davomat found
 *       404:
 *         description: Davomat not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getStudentLessonById);

/**
 * @swagger
 * /student-lesson/{id}:
 *   put:
 *     summary: Update student lesson
 *     tags: [StudentLesson]
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
 *               lesson_id:
 *                 type: integer
 *                 example: 1
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               is_there:
 *                 type: boolean
 *                 example: true
 *               reason:
 *                 type: string
 *                 example: "Kasal"
 *               be_paid:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Davomat updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Davomat not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateStudentLessonSchema), updateStudentLesson);

/**
 * @swagger
 * /student-lesson/{id}:
 *   delete:
 *     summary: Delete student lesson
 *     tags: [StudentLesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Davomat deleted successfully
 *       404:
 *         description: Davomat not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteStudentLesson);

module.exports = router;
