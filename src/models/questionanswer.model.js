const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
   
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
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const questionAnswerSchema = new Schema({
    section: [questionSchema],
 
});

module.exports = mongoose.model("QuestionAnswer", questionAnswerSchema);

