const Sequelize = require("sequelize");
const sequelize = require("../helpers/db.js");

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  }
});

module.exports = Users;
