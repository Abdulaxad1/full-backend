const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Payment = sequelize.define(
  "Payment",
  {
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    payment_last_date: { type: DataTypes.DATEONLY },
    payment_date: { type: DataTypes.DATEONLY },
    price: { type: DataTypes.DECIMAL(12, 2) },
    is_paid: { type: DataTypes.BOOLEAN, defaultValue: false },
    total_attent: { type: DataTypes.INTEGER },
  },
  {
    tableName: "payment",
    timestamps: false,
    indexes: [
      { fields: ["student_id"] },
    ],
  },
);

Payment.associate = (models) => {
  Payment.belongsTo(models.Student, { foreignKey: "student_id", as: "student", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

module.exports = { Payment };
