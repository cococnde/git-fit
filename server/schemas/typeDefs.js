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

  input ExerciseInput {
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

  type Query {
    exercises: [Exercise]
    exercise(name: String!): Exercise
  }

  type Mutation{
  login( email: String!, password: String!): AuthPayload
  signup(username: String!, email: String!, password: String!): AuthPayload
  saveExercise(newExercise: ExerciseInput ):User
  updateExercise(exerciseId: ID!): User
  removeExercise(exerciseId: ID!): User
  }

  type Mutation {
    signUp(email: String!, password: String!, username: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;