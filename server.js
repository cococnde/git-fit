require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const typeDefs = require('./server/schemas/typeDefs');
const resolvers = require('./server/schemas/resolvers'); // Correctly import resolvers
const db = require('./server/config/connection'); // Correctly import the Mongoose connection

const PORT = process.env.PORT || 4001;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

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

    db.once('connected', () => { // Use 'once' instead of 'on' for initial connection
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


