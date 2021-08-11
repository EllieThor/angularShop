const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const ProductsModel = sequelize.define("products", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ProductName: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  Price: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  Description: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  ImageName: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
});
module.exports = ProductsModel;
