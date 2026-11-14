const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  searchStudent,
  deleteStudent,
} = require("../controllers/studentController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createStudentSchema, updateStudentSchema } = require("../validations/studentValidation");

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: O'quvchi boshqaruvi endpointlari
 */

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *             properties:
 *               lid_id:
 *                 type: integer
 *                 example: 1
 *               first_name:
 *                 type: string
 *                 example: "Vali"
 *               last_name:
 *                 type: string
 *                 example: "Rahimov"
 *               phone_number:
 *                 type: string
 *                 example: "+998901112233"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "2010-05-20"
 *               gender:
 *                 type: string
 *                 example: "Erkak"
 *     responses:
 *       201:
 *         description: O'quvchi muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createStudentSchema), createStudent);

/**
 * @swagger
 * /student/search:
 *   get:
 *     summary: Search student records
 *     tags: [Student]
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

router.get("/search", searchStudent);

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all student records
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: O'quvchi list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getStudents);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Get student by id
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: O'quvchi found
 *       404:
 *         description: O'quvchi not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getStudentById);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update student
 *     tags: [Student]
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
 *               lid_id:
 *                 type: integer
 *                 example: 1
 *               first_name:
 *                 type: string
 *                 example: "Vali"
 *               last_name:
 *                 type: string
 *                 example: "Rahimov"
 *               phone_number:
 *                 type: string
 *                 example: "+998901112233"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "2010-05-20"
 *               gender:
 *                 type: string
 *                 example: "Erkak"
 *     responses:
 *       200:
 *         description: O'quvchi updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: O'quvchi not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateStudentSchema), updateStudent);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: O'quvchi deleted successfully
 *       404:
 *         description: O'quvchi not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteStudent);

module.exports = router;
