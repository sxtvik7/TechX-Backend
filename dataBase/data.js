const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "sql6.freesqldatabase.com",
  user: "sql6702781",
  password: "giJ99Vm78a",
  database: "sql6702781",
  port: 3306,
});

module.exports = connection;