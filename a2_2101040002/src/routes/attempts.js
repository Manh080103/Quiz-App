const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
// const controller = require('../app/controller/controller');
const router = express.Router();
const Question = require('../app/models/Questions');
const Attempt = require('../app/models/Attempts');

const { json } = require('express');
const { db } = require('../app/models/Attempts');
const { mongo } = require('mongoose');
const { collection } = require('../app/models/Questions');



router.post('/attempts', async (req, res) => {
    try {
       
        const questions = await db.collection('questions').aggregate([{
            $sample: { size: 10 },
        }]).toArray();
        
        
        const attempt = new Attempt({
            questions: questions,
            correctAnswer: {},
            _id: mongodb.ObjectId(),
            score: 0,
            
        }); 

        questions.forEach((ques) => {
            attempt.correctAnswer[ques._id] = ques.correctAnswer;
            delete ques.correctAnswer;
          });
        
        // await db.collection('attempts').updateMany(
        //     {},
        //     {$unset: { correctAnswer: ""}}
        // )
        
        await attempt.save();
        const result = await Attempt.findOne().sort({ _id: -1 }).limit(1).select('-correctAnswer');

        // Attempt.count().exec(function(err, count) {
        //     let random = Math.floor(Math.random() * count)
        //     Attempt.findOne().skip(random).select('-correctAnswer').exec(
        //         function(err, result) {
        //             res.status(201).json(result);
        //         }
        //     )
        // });
        
        res.status(201).json(result);
        
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

router.post('/attempts/:id/submit', async (req, res) => {
    const data = req.body;
    const _id = req.params.id;
    const userAnswers = data.userAnswers;
    const answerId = Object.keys(userAnswers);
    const answerIndex = Object.values(userAnswers);
    let score = 0;
    let scoreText = '';

    // console.log(answerId);
    // console.log(answerIndex);

    // console.log(userAnswers)
    
    
    let ques = [];
    let correctAns = {};
    let text = "";
    
    for (let i = 0; i < 10; i++) {
        ques[i] = await Attempt.findOne().sort({ _id: -1 }).limit(1);
        correctAns = ques[i].correctAnswer;
        // text = ques[i].text;
        const correctAnsId = Object.keys(correctAns);
        const correctAnsIndex = Object.values(correctAns);

        if(answerId[i] == correctAnsId[i] && answerIndex[i] == correctAnsIndex[i]) {
            score = score + 1;
        } 
        // console.log(score);
        
        if (score < 5) {
            scoreText = 'Practice more to improve it :D';
        } else if (score >= 5 && score < 7) {
            scoreText = 'Good, keep up!';
        } else if (score >= 7 && score < 9) {
            scoreText = 'Well done!';
        } else if (score >= 9 && score <= 10) {
            scoreText = 'Perfect!!';
        }

        // console.log(ques[i].correctAnswer)
        // const correctAnswerId = ques[i].Object.keys(ques[i].correctAnswer);
        // console.log(correctAnswerId);
        // console.log(ques[i])
        // console.log(a)
        // console.log(correctAns);
    }       

    console.log(text)
    // const form = {
    //     "_id": _id,
    //     "score": score,
    //     "scoreText": scoreText,
    //     "questions": ques,
    //     "startAt": Date.now(),
    //     "correctAnswers": correctAns,
    //     "userAnswers": userAnswers,
    //     "completed": true,
    //     "__v": 0,
    // };

   const result = await Attempt.findOneAndUpdate(
        {   
            _id: _id,
        },
        {
            "_id": _id,
            userAnswers: userAnswers,
            completed: true,
            score: score,
            
        },
        {
            new: true
        }
   ).sort({ _id: -1 });
//    

    console.log(result)

    // console.log(form)
   res.status(200).json(result);
});


module.exports = router;