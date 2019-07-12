const mysql = require("mysql2");
const parse = require("connection-string");
const connectProd = parse(process.env.CLEARDB_DATABASE_URL);

const connection =
  process.env.NODE_ENV === "production"
    ? mysql.createConnection({
        database: "heroku_443901cef8b613b",
        user: "b88805a3087cb8",
        password: "bf0ef2eb",
        port: 3306,
        host: "eu-cdbr-west-02.cleardb.net",
      })
    : mysql.createConnection({
        multipleStatements: true,
        user: "root",
        password: "rootSam$",
        database: "alternance",
        port: 3306,
        host: "127.0.0.1",
      });
module.exports = connection;

// const mysql = require("mysql2");
// const parse = require("connection-string");
// const connectProd = parse(process.env.CLEARDB_DATABASE_URL);
// console.log(process.env.CLEARDB_DATABASE_URL);
// const connection = mysql.createConnection({
//   multipleStatements: true,
//   user: "root",
//   password: "rootSam$",
//   database: "alternance",
//   host: "127.0.0.1"
// });
// module.exports = connection;
