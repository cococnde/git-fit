const { Exercise } = require('../models');

const resolvers = {
  Query: {
    exercises: async () => {
      return await Exercise.find({});
    }
  }
};

module.exports = resolvers;