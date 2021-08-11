var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("project4_ellie_thor", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
