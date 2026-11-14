const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Role = sequelize.define(
  "Role",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "role",
    timestamps: false,
  },
);

Role.associate = (models) => {
  Role.hasMany(models.StuffRole, { foreignKey: "role_id", as: "stuff_roles", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { Role };
