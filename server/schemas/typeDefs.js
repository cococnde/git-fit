const typeDefs = `
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
     type Query {
    exercises: [Exercise]
  }

  type Mutation{
  login( email: String!, password: String!): Auth
  signup(username: String!, email: String!, password: String!): Auth
  saveExercise(newExercise: ExerciseInput):User
  updateExercise(exerciseId: ID!): User
  removeExercise(exerciseId: ID!): User
  }
`;

module.exports = typeDefs;