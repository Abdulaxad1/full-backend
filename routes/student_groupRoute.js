const express = require("express");
const router = express.Router();

const {
  createStudentGroup,
  getStudentGroups,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup,
} = require("../controllers/student_groupController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const { createStudentGroupSchema, updateStudentGroupSchema } = require("../validations/student_groupValidation");

/**
 * @swagger
 * tags:
 *   - name: StudentGroup
 *     description: O'quvchi guruhi boshqaruvi endpointlari
 */

/**
 * @swagger
 * /student-group:
 *   post:
 *     summary: Create student group
 *     tags: [StudentGroup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - group_id
 *             properties:
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               group_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: O'quvchi guruhi muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/", validateSchema(createStudentGroupSchema), createStudentGroup);

/**
 * @swagger
 * /student-group:
 *   get:
 *     summary: Get all student group records
 *     tags: [StudentGroup]
 *     responses:
 *       200:
 *         description: O'quvchi guruhi list retrieved successfully
 *       500:
 *         description: Server error
 */

router.get("/", getStudentGroups);

/**
 * @swagger
 * /student-group/{id}:
 *   get:
 *     summary: Get student group by id
 *     tags: [StudentGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: O'quvchi guruhi found
 *       404:
 *         description: O'quvchi guruhi not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getStudentGroupById);

/**
 * @swagger
 * /student-group/{id}:
 *   put:
 *     summary: Update student group
 *     tags: [StudentGroup]
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
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               group_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: O'quvchi guruhi updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: O'quvchi guruhi not found
 *       500:
 *         description: Server error
 */

router.put("/:id", validateSchema(updateStudentGroupSchema), updateStudentGroup);

/**
 * @swagger
 * /student-group/{id}:
 *   delete:
 *     summary: Delete student group
 *     tags: [StudentGroup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: O'quvchi guruhi deleted successfully
 *       404:
 *         description: O'quvchi guruhi not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", deleteStudentGroup);

module.exports = router;
