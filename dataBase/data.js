const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "sql12.freesqldatabase.com",
  user: "sql12757421",
  password: "zsyViTUuXK",
  database: "sql12757421",
  port: 3306,
});

module.exports = connection;