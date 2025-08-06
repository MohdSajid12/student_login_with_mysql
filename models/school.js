const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const School = sequelize.define('School', {
  name: DataTypes.STRING,
  daily_login_limit: DataTypes.INTEGER
}, { tableName: 'schools', timestamps: false });

module.exports = School;
