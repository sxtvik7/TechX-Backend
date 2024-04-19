const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "sql6.freesqldatabase.com",
  user: "sql6700329",
  password: "xlsuMisTSM",
  database: "sql6700329",
  port: 3306,
});

module.exports = connection;