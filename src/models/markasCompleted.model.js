const { Schema, model } = require('mongoose');

const markasCompleted = new Schema({
    name:{
        type:  Schema.Types.ObjectId,
        ref: "Student",
    },
    markasCompleted: {
        type: Boolean,
        required: true
    } 
})

module.exports = model("markasCompleted", markasCompleted);