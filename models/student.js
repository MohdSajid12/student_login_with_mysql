const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const School = require('./school');

const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password_hash: DataTypes.STRING
}, { tableName: 'students', timestamps: false });

Student.belongsTo(School, { foreignKey: 'school_id' });

module.exports = Student;
