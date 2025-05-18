const mysql = require('mysql2');
require('dotenv').config();

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.Host,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
  },
  migrations: {
    directory: './migrations',
  },
};
