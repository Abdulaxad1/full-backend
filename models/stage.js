const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Stage = sequelize.define(
  "Stage",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "stage",
    timestamps: false,
  },
);

Stage.associate = (models) => {
  Stage.hasMany(models.Group, { foreignKey: "group_stage_id", as: "groups", onDelete: "SET NULL", onUpdate: "CASCADE" });
  Stage.hasMany(models.Lid, { foreignKey: "lid_stage_id", as: "lids", onDelete: "SET NULL", onUpdate: "CASCADE" });
};

module.exports = { Stage };
