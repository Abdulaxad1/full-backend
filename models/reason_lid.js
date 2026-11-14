const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const ReasonLid = sequelize.define(
  "ReasonLid",
  {
    reason_lid: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "reason_lid",
    timestamps: false,
  },
);

ReasonLid.associate = (models) => {
  ReasonLid.hasMany(models.Lid, { foreignKey: "cancel_reson_id", as: "lids", onDelete: "SET NULL", onUpdate: "CASCADE" });
};

module.exports = { ReasonLid };
