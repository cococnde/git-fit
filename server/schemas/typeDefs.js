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
    exercise(name: String!): Exercise
  }
`;
module.exports = typeDefs;