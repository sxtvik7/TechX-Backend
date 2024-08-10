const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "sql12.freesqldatabase.com",
  user: "sql12725179",
  password: "LK9zQ5Zi9c",
  database: "test",
  port: 3306,
});

module.exports = connection;