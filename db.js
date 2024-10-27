// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Adjust to your MariaDB host
  user: 'root',      // Adjust to your MariaDB username
  password: 'root', // Adjust to your MariaDB password
  database: 'travelokaplus'
});

module.exports = pool.promise();
