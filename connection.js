// Importing the necessary packages
require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoletable = require('console.table');

// Creating the connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Connecting to the MySQL database using promises
const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        reject(err);
        return;
      }
      console.log('Connected to the database.');
      resolve();
    });
  });
};

// Exporting the connected promise-based connection
module.exports = {
  connectToDatabase,
  connection
};
