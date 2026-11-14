const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Stuff = sequelize.define(
  "Stuff",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    parol: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "stuff",
    timestamps: false,
  },
);

Stuff.associate = (models) => {
  Stuff.hasMany(models.StuffRole, { foreignKey: "stuff_id", as: "stuff_roles", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Stuff.hasMany(models.GroupStuff, { foreignKey: "stuff_id", as: "group_stuffs", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { Stuff };
