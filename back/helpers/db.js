const mysql = require("mysql2");
const parse = require('connection-string');
const connectProd = parse(process.node.CLEARDB_DATABASE_URL)
const connection = 
process.node.NODE_ENV = 'production'
?

mysql.createConnection(
connectProd
);

:

mysql.createConnection({
  multipleStatements: true,
  user: "root",
  password: "rootSam$",
  database: "alternance",
  port: 3306,
  host: "127.0.0.1"
});
module.exports = connection;

