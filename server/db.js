const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, 
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};

// Attach connection listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB.');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB.');
});

connectToDatabase(); // Start the connection process

module.exports = mongoose.connection;
