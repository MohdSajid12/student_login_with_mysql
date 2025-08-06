const moment = require('moment-timezone');

exports.startOfDay = () => moment().tz("Asia/Kolkata").startOf('day').toDate();
exports.endOfDay = () => moment().tz("Asia/Kolkata").endOf('day').toDate();
