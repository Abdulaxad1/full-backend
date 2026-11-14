const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const GroupStuff = sequelize.define(
  "GroupStuff",
  {
    group_id: { type: DataTypes.INTEGER, allowNull: false },
    stuff_id: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "group_stuff",
    timestamps: false,
    indexes: [
      { fields: ["group_id"] },
      { fields: ["stuff_id"] },
      { unique: true, fields: ["group_id", "stuff_id"] },
    ],
  },
);

GroupStuff.associate = (models) => {
  GroupStuff.belongsTo(models.Group, { foreignKey: "group_id", as: "group", onDelete: "CASCADE", onUpdate: "CASCADE" });
  GroupStuff.belongsTo(models.Stuff, { foreignKey: "stuff_id", as: "stuff", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { GroupStuff };
