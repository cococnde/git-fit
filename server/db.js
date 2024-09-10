// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Timeout for socket inactivity
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

// Listen for connection errors
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Log when Mongoose connects or disconnects
mongoose.connection.on('connected', () => {
  console.log('Mongoose successfully connected to MongoDB!');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB.');
});

module.exports = mongoose.connection;

