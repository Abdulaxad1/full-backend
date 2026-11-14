const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Student = sequelize.define(
  "Student",
  {
    lid_id: { type: DataTypes.INTEGER },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    birthday: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
  },
  {
    tableName: "students",
    timestamps: false,
    indexes: [
      { fields: ["lid_id"] },
    ],
  },
);

Student.associate = (models) => {
  Student.belongsTo(models.Lid, { foreignKey: "lid_id", as: "lid", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Student.hasMany(models.StudentGroup, { foreignKey: "student_id", as: "student_groups", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Student.hasMany(models.StudentLesson, { foreignKey: "student_id", as: "student_lessons", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Student.hasMany(models.Payment, { foreignKey: "student_id", as: "payments", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { Student };
