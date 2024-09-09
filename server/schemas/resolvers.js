const { Exercise } = require('../models');

const resolvers = {
  Query: {
    exercises: async () => {
      return await Exercise.find({});
    },
    exercise: async (parent, args) => {
      return await Exercise.findOne({ name: args.name });
    }
  }
};

module.exports = resolvers;

