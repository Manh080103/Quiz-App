const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('strictQuery', false);

const Attempt = new Schema({
    questions: { type: Array,  ref: "Question"},
    // text: { type: String, maxLength: 255, ref: "Question" },
    // answers: { type: Array, ref: "Question"  },
    correctAnswer: {},  
    userAnswers: {},
    score: {type: Number, default: 0},
    startedAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false},
  },
  {
    collection: "attempts"
  },
  {
    strict: false
  }

);


module.exports =  mongoose.model("Attempt", Attempt);
