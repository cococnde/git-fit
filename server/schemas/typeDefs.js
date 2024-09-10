const { gql } = require('apollo-server');

// Define your full type definitions
const typeDefs = gql`
  type Exercise {
    _id: ID
    name: String
    force: String
    level: String
    mechanic: String
    equipment: String
    primaryMuscles: [String]
    secondaryMuscles: [String]
    instructions: [String]
    category: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    exercises: [Exercise]
  }

  type Mutation {
    signUp(email: String!, password: String!, username: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;