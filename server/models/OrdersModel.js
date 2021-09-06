const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const OrdersModel = sequelize.define("orders", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  FinalPrice: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  ShippingCity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ShippingStreet: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ShippingDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  CreditCard: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = OrdersModel;
