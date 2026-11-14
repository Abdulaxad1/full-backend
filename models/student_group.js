const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const StudentGroup = sequelize.define(
  "StudentGroup",
  {
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    group_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "student_group",
    timestamps: false,
    indexes: [
      { fields: ["student_id"] },
      { fields: ["group_id"] },
      { unique: true, fields: ["student_id", "group_id"] },
    ],
  },
);

StudentGroup.associate = (models) => {
  StudentGroup.belongsTo(models.Student, { foreignKey: "student_id", as: "student", onDelete: "CASCADE", onUpdate: "CASCADE" });
  StudentGroup.belongsTo(models.Group, { foreignKey: "group_id", as: "group", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { StudentGroup };
