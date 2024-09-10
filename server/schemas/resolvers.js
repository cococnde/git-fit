// resolvers.js

const { Exercise, User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    exercises: async () => {
      try {
        return await Exercise.find({});
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch exercises');
      }
    }
  },
  Mutation: {
    signUp: async (_, { email, password, username }) => {
      try {
        // Check if a user already exists with the given email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new AuthenticationError('User already exists');
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it to the database
        const user = await User.create({
          email,
          username,
          password: hashedPassword,
        });

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: '1h',
        });

        return { token, user };
      } catch (err) {
        console.error('Error in signUp mutation:', err); // Log the complete error
        throw new Error('Failed to sign up');
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        // Check if the provided password matches the hashed password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new AuthenticationError('Invalid credentials');
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: '1h',
        });

        return { token, user };
      } catch (err) {
        console.error('Error in login mutation:', err.message);
        console.error('Error stack trace:', err.stack);
        throw new Error('Failed to log in');
      }
    },
  },
};

module.exports = resolvers;
