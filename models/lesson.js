const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Lesson = sequelize.define(
  "Lesson",
  {
    lesson_theme: { type: DataTypes.STRING },
    lesson_number: { type: DataTypes.INTEGER },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    lesson_date: { type: DataTypes.DATEONLY },
  },
  {
    tableName: "lesson",
    timestamps: false,
    indexes: [
      { fields: ["group_id"] },
    ],
  },
);

Lesson.associate = (models) => {
  Lesson.belongsTo(models.Group, { foreignKey: "group_id", as: "group", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Lesson.hasMany(models.StudentLesson, { foreignKey: "lesson_id", as: "student_lessons", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { Lesson };
