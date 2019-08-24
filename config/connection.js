// Set up MySQL connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'review_db'
});

// Make connection
connection.connect(error => {
  // check if error connecting to db
  if (error) {
    console.error("error connection: " + error.stack);
    return;
  }
  console.log("connected as id: ", + connection.threadId);
});

// Export connection
module.exports = connection;