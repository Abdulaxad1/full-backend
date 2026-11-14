const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Lid = sequelize.define(
  "Lid",
  {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    lid_stage_id: { type: DataTypes.INTEGER },
    test_date: { type: DataTypes.DATEONLY },
    trial_lesson_date: { type: DataTypes.INTEGER },
    trial_lesson_time: { type: DataTypes.STRING },
    trial_lesson_group_id: { type: DataTypes.INTEGER },
    lid_status_id: { type: DataTypes.INTEGER },
    cancel_reson_id: { type: DataTypes.INTEGER },
  },
  {
    tableName: "lid",
    timestamps: false,
    indexes: [
      { fields: ["lid_stage_id"] },
      { fields: ["trial_lesson_group_id"] },
      { fields: ["lid_status_id"] },
      { fields: ["cancel_reson_id"] },
    ],
  },
);

Lid.associate = (models) => {
  Lid.belongsTo(models.Stage, { foreignKey: "lid_stage_id", as: "stage", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Lid.belongsTo(models.Group, { foreignKey: "trial_lesson_group_id", as: "trial_group", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Lid.belongsTo(models.LidStatus, { foreignKey: "lid_status_id", as: "status", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Lid.belongsTo(models.ReasonLid, { foreignKey: "cancel_reson_id", as: "cancel_reason", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Lid.hasMany(models.Student, { foreignKey: "lid_id", as: "students", onDelete: "SET NULL", onUpdate: "CASCADE" });
};

module.exports = { Lid };
