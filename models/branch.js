const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Branch = sequelize.define(
  "Branch",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    call_number: { type: DataTypes.STRING },
  },
  {
    tableName: "branch",
    timestamps: false,
  },
);

Branch.associate = (models) => {
  Branch.hasMany(models.Group, { foreignKey: "branch_id", as: "groups", onDelete: "SET NULL", onUpdate: "CASCADE" });
};

module.exports = { Branch };
