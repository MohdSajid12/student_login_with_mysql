const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Student = require('./student');

const StudentLogin = sequelize.define('StudentLogin', {
  login_time: DataTypes.DATE
}, { tableName: 'student_logins', timestamps: false });

StudentLogin.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = StudentLogin;
