const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CartsModel = sequelize.define("carts", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  IsPaid: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
  },
});
module.exports = CartsModel;
