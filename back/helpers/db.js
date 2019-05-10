const mysql = require("mysql2");
const connection = mysql.createConnection({
  multipleStatements: true,
  user: "root",
  password: "rootSam$",
  database: "alternance",
  port: 3306,
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false
});
module.exports = connection;
