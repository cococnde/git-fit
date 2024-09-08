const { Schema, model} = require('mongoose');

const exerciseSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        trim: true,
        unique: true,
    },
    force: {
        type: String,
    },
    level:{
        type: String,
    },
    mechanic:{
        type: String,
    },
    equipment:{
        type: String,
    },
    primaryMuscles:{
        type: [String],
    },
    secondaryMuscles:{
        type: [String],
    },
    instructions:{
        type: [String],
    },
    category:{
        type: String,
    },

})

const Exercise= model('Exercise', exerciseSchema);

module.exports = Exercise;