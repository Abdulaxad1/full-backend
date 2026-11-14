const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const StuffRole = sequelize.define(
  "StuffRole",
  {
    stuff_id: { type: DataTypes.BIGINT, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "stuff_role",
    timestamps: false,
    indexes: [
      { fields: ["stuff_id"] },
      { fields: ["role_id"] },
      { unique: true, fields: ["stuff_id", "role_id"] },
    ],
  },
);

StuffRole.associate = (models) => {
  StuffRole.belongsTo(models.Stuff, { foreignKey: "stuff_id", as: "stuff", onDelete: "CASCADE", onUpdate: "CASCADE" });
  StuffRole.belongsTo(models.Role, { foreignKey: "role_id", as: "role", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { StuffRole };
