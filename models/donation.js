const { DataTypes } = require("sequelize");
const sequelize = require("../utilities/database");

const Donation = sequelize.define("Donation", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DOUBLE.UNSIGNED,
    allowNull: false,
  },
  donate_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Donation;
