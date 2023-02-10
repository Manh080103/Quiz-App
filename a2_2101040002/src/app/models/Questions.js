const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const Question = new Schema({
    text: { type: String, maxLength: 255 },
    answers: { type: Array },  
    correctAnswer: {},                                                                             
    startedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false},
  },
  {
    collection: "questions"
  }
    
);


module.exports = mongoose.model("Question", Question);