const mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize("heroku_443901cef8b613b", "b88805a3087cb8", "bf0ef2eb", {
        host: "eu-cdbr-west-02.cleardb.net",
        dialect: "mysql",
        define: {
          timestamps: false
        }
      })
    : new Sequelize("alternance", "root", "rootSam$", {
        host: "localhost",
        dialect: "mysql",
        define: {
          timestamps: false
        }
      });

module.exports = sequelize;
