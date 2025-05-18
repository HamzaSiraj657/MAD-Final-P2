const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
host: process.env.Host,
user: process.env.User,
password: process.env.Password,
database: process.env.Database,
});

connection.connect(err => {
if (err) {
console.error('MySQL connection error:', err);
process.exit(1);
}
console.log('Connected to MySQL database');
});

module.exports = connection;