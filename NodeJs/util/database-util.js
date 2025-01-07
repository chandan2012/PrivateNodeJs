const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost", // Your MySQL server host (default: localhost)
  user: "root", // Your MySQL username
  password: "Slader20@#", // Your MySQL password
  database: "airbnb", // Your database name
});

module.exports = pool.promise();
