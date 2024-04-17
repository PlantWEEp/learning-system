const { Schema, model } = require('mongoose');

const markasCompleted = new Schema({
    name:{
        type:  Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    markasCompleted: {
        type: Boolean,
        default:false,
        required: true
    } 
})

module.exports = model("markasCompleted", markasCompleted);