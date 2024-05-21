const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "10.10.10.111",
  user: "rstuym8um",
  password: "e22abc47",
  database: "test",
  port: 3306,
});

module.exports = connection;