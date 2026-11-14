const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const LidStatus = sequelize.define(
  "LidStatus",
  {
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "lid_status",
    timestamps: false,
  },
);

LidStatus.associate = (models) => {
  LidStatus.hasMany(models.Lid, { foreignKey: "lid_status_id", as: "lids", onDelete: "SET NULL", onUpdate: "CASCADE" });
};

module.exports = { LidStatus };
