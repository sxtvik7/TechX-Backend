const mySql = require("mysql");

// Create a connection pool to the MySQL database
const connection = mySql.createPool({
  connectionLimit: 10,
  host: "10.10.10.111",
  user: "sud_test",
  password: "6e*]gT9uSK(MH92_",
  database: "test",
  port: 3306,
});

module.exports = connection;