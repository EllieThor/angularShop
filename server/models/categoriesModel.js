const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CategoriesModel = sequelize.define("categories", {
  ID: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  CategoryName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = CategoriesModel;
