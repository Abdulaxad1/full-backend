const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const StudentLesson = sequelize.define(
  "StudentLesson",
  {
    lesson_id: { type: DataTypes.INTEGER, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    is_there: { type: DataTypes.BOOLEAN, defaultValue: false },
    reason: { type: DataTypes.STRING },
    be_paid: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "student_lesson",
    timestamps: false,
    indexes: [
      { fields: ["lesson_id"] },
      { fields: ["student_id"] },
      { unique: true, fields: ["lesson_id", "student_id"] },
    ],
  },
);

StudentLesson.associate = (models) => {
  StudentLesson.belongsTo(models.Lesson, { foreignKey: "lesson_id", as: "lesson", onDelete: "CASCADE", onUpdate: "CASCADE" });
  StudentLesson.belongsTo(models.Student, { foreignKey: "student_id", as: "student", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { StudentLesson };
