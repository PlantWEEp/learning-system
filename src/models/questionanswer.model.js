const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  sectionName:{
    type:String,
    required:true
  },
  question: {
    type: String,
    required: true,
  },
  choices: [{
    value: String,
    isCorrect: Boolean,
  }
],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["basic", "advance", "higher"],
  },
});
 
module.exports = model("QuestionAnswer", questionSchema);