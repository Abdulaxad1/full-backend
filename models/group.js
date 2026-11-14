const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Group = sequelize.define(
  "Group",
  {
    group_name: { type: DataTypes.STRING, allowNull: false },
    lesson_start_time: { type: DataTypes.STRING },
    lesson_continuous: { type: DataTypes.STRING },
    lesson_week_day: { type: DataTypes.STRING },
    group_stage_id: { type: DataTypes.INTEGER },
    room_number: { type: DataTypes.STRING },
    room_floor: { type: DataTypes.INTEGER },
    branch_id: { type: DataTypes.INTEGER },
    lessons_quant: { type: DataTypes.INTEGER },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "groups",
    timestamps: false,
    indexes: [
      { fields: ["group_stage_id"] },
      { fields: ["branch_id"] },
    ],
  },
);

Group.associate = (models) => {
  Group.belongsTo(models.Stage, { foreignKey: "group_stage_id", as: "stage", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Group.belongsTo(models.Branch, { foreignKey: "branch_id", as: "branch", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Group.hasMany(models.GroupStuff, { foreignKey: "group_id", as: "group_stuffs", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Group.hasMany(models.Lid, { foreignKey: "trial_lesson_group_id", as: "trial_lids", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Group.hasMany(models.StudentGroup, { foreignKey: "group_id", as: "student_groups", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Group.hasMany(models.Lesson, { foreignKey: "group_id", as: "lessons", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { Group };
