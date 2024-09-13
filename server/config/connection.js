const mongoose = require('mongoose');

mongoose.connect((process.env.MONGODB_URI && process.env.NODE_ENV !== "development")  ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/Exercise');

module.exports = mongoose.connection;