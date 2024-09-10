require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./server/schemas');
const db = require('./db'); // Correctly importing the Mongoose connection

const PORT = process.env.PORT || 4001;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
const startApolloServer = async () => {
  try {
    console.log('Starting Apollo Server...');
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.use('/graphql', expressMiddleware(server));

    console.log('Waiting for MongoDB connection...');

    db.on('connected', () => {
      console.log('MongoDB connection is open, starting the server...');
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });

    db.on('error', (error) => {
      console.error('Error in MongoDB connection:', error);
    });

  } catch (err) {
    console.error('Failed to start Apollo Server:', err);
  }
};

startApolloServer();

