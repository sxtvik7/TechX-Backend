const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "techx",
  port: 3308,
});

module.exports = connection;