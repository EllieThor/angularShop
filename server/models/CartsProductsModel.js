const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CartsProductsModel = sequelize.define("carts-products", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Qnt: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  TotalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});
module.exports = CartsProductsModel;
