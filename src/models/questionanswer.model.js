const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionAnswerSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    wronganswer: [{
        type: String,
        required: true
      }],
    description: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true,
        enum: ["easy","medium","difficult"]
    },
});

module.exports = mongoose.model("QuestionAnswer", questionAnswerSchema);
