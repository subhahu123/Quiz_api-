var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database(':memory:');
var file = "quiz.sqlite3";
var db = new sqlite3.Database(file, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

const sql = `
    CREATE TABLE IF NOT EXISTS quiz (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    )` ;
db.run(sql) ;

const sql2 = `
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      options TEXT,
      correct_option INTEGER,
      points INTEGER,
      quiz INTEGER NOT NULL,
      FOREIGN KEY(quiz) REFERENCES quiz(id)
    )` ;
db.run(sql2) ;



function CreateQuiz(name, description) {
    let id = 3 ;
    db.run(
      `INSERT INTO quiz (name, description)
        VALUES (?, ?)`,
      [name, description], function (err, result) {
          if(err) {
              console.log("error") ;
          }
          console.log(this) ;
          id = this.lastID ;
      }
    )
    return id ;
}

function CreateQuestion(name, options, correct_option, points, quiz, res) {
    return db.run(
      `INSERT INTO questions (name, options, correct_option, points, quiz)
        VALUES (?, ?, ?, ?, ?)`,
      [name, options, correct_option, points, quiz], function (err, result) {
          if(err) {
              console.log("error") ;
          }
          console.log(this) ;
          console.log(this.lastID) ;
      }
    )
}


/* GET users listing. */

router.post('/quiz', function (req, res, next) {
    console.log(req.body) ;
    console.log(req.body.name) ;
    data = CreateQuiz(req.body.name, req.body.description);
    console.log(data);
    res.json({
        "id": data,
        "name": req.body.name,
        "description": req.body.description
    });
});

router.get('/quiz/:quiz_id', function (req, res, next) {
    console.log(req.params);
    var id = req.params.quiz_id ;
    db.get('SELECT * FROM quiz WHERE id = ?', [id], (err, result) => {
        if(err) {
            console.log("getting error") ;
        }
        else {
            res.json(result) ;
        }
    });
//    res.send('respond with a resource');
});

router.post('/questions', function (req, res, next) {
    console.log(req.body) ;
    console.log(req.body.name) ;
    CreateQuestion(req.body.name, req.body.options, req.body.correct_option, req.body.points, req.body.quiz, res) ;
    res.json({
        "name": req.body.name,
        "options": req.body.options,
        "correct_option": req.body.correct_option,
        "points": req.body.points,
        "quiz": req.body.quiz
    })
});

router.get('/questions/:question_id', function (req, res, next) {
    console.log(req.params);
    var id = req.params.question_id ;
    db.get('SELECT * FROM questions WHERE id = ?', [id], (err, result) => {
        if(err) {
            console.log("getting error") ;
        }
        else {
            res.json(result) ;
        }
    });
});

router.get('/quiz-questions/:quiz_id', function (req, res, next) {
    console.log(req.params);
    var id = req.params.quiz_id ;
    var resul = new Promise((resolve, reject) => {
        db.all('SELECT * FROM questions WHERE quiz = ?', [id], (err, result) => {
            if(err) {
                console.log("getting error") ;
            }
            else {
            //    res.send(result) ;
                console.log(result) ;
                resolve(result) ;
            }
        })
    }) ;
    
    console.log(resul) ;
    db.get('SELECT * FROM quiz WHERE id = ?', [id], (err, result) => {
        if(err) {
            console.log("getting error") ;
        }
        else {
            res.json(result) ;
        }
    });

//     res.send('respond with a resource');
});

module.exports = router;