const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const UsersModel = sequelize.define("users", {
  ID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
  },
  Role: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Phone: {
    type: Sequelize.INTEGER(20),
    allowNull: true,
  },
  Street: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  StreetNumber: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
  FlatNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  City: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
module.exports = UsersModel;
