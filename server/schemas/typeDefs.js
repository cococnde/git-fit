// Define your full type definitions
const typeDefs = `
  type Exercise {
    id: ID
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
    searchExercises(searchTerm: String!): [Exercise]
  }
  
  


  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signUp( email: String!, password: String!): AuthPayload
    saveExercise(newExercise: ExerciseInput): User
    updateExercise(exerciseId: ID!): User
    removeExercise(exerciseId: ID!): User
  }
`;

module.exports = typeDefs;
