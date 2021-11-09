var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("heroku_c223332842e48d9", "b0fb67475fa9c3", "306becc9", {
  host: "us-cdbr-east-04.cleardb.com",
  dialect: "mysql",
});

module.exports = sequelize;
// mysql://b0fb67475fa9c3:306becc9@us-cdbr-east-04.cleardb.com/heroku_c223332842e48d9?reconnect=true
// var mysql = require("mysql2");
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("project4_ellie_thor", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// module.exports = sequelize;
