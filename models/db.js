const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    timezone: '+05:30',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Wait up to 30s to get a connection
      idle: 10000     // Removing idle connections after 10s
    }
  }
);

module.exports = sequelize;
