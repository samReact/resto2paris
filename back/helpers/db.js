const mysql = require("mysql2");
const connection = mysql.createConnection({
  multipleStatements: true,
  user: "root",
  password: "rootSam$",
  database: "alternance",
  port: 3306,
  host: "127.0.0.1"
});
module.exports = connection;
