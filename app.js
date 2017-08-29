const express = require('express')
const mustacheExpress = require('mustache-express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// const MongoClient = require('mongodb').MongoClient;
  // , assert = require('assert')

// Connection URL
let mongoURL = 'mongodb://localhost:27017/newdb'
// Make sure that constants and the term after *27017/ stay consistent.... the "newdb" shown on the line above has to match what is written on the command line prompt for the import.
// mongoimport --db newdb --collection robots --jsonArray robot_data.json
// let name = ""

const app = express()
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

app.get('/available', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots')
    robots.find({job: null}).toArray(function (err, job) {
      res.render('available', {robots: job})
    })
  })
})

app.get('/employed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots')
    robots.find({job: {$ne: null}}).toArray(function (err, job) {
      res.render('employed', {robots: job})
    })
  })
})

app.get('/:username', function (req, res){
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    let username = req.params.username;
    // console.log(username);
    // console.log(typeof req.params.username);
    // console.log(req.params.username);
    robots.find({username: username}).toArray(function (err, docs) {
      res.render('individual', {robots: docs});
    });
  });
});

// What Clinton posted in below.. However, I've changed restaurants to robots and made other db-specific modifications.
app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots')
    // let skills = robots.distinct('skills').sort({'skills': 1})
    // let skills = robots.distinct('skills')
    // let skills = db.robots.distinct('skills').sort()/*bummer, this worked in the console but is NOT working here...*/
//     robots.aggregate([
//     { $sort : { skills : 1 } },
//     { $group : {_id : "$key", skills : { $push : skills } } }
// ])/*https://stackoverflow.com/questions/4759437/get-distinct-values-with-sorted-data*/

    // How does one get a list of all skills listed in the robots db???
    // console.log(skills)
    robots.find({}).toArray(function (err, docs) {
      res.render('robot', {robots: docs /*, skills: skills.sort*/})
    })
  })
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
})

// var data = [{name: 'dan', value: 40}, {name: 'ryan', value: 50}];
// var getKeys = _.pluck(data, 'name');
// I want to generate a menu that lists all of the skills listed in the db. How to I access this info?

// app.use('/', function (req, res) {
//   MongoClient.connect(mongoURL, function (err, db) {
//     const robots = db.collection('robots');
//     robots.find({}).toArray(function (err, docs) {
//       res.render('robot', {robots: docs})
//     })
//   })
// })
//
// app.post('/skills:skill', function(req, res){
//     let skill = req.params.skill;
//     console.log(skill)
//     console.log(typeof req.params.skill);
//     console.log(req.params.skill);
//     robots.find({username: skill}).toArray(function (err, docs) {
//       res.render('individual', {robots: docs});
//     });
//   });

/*see node documentation for assert here - https://nodejs.org/api/assert.html#assert_assert; question on StackO - https://stackoverflow.com/questions/28129223/node-js-assert-module-in-mongodb-driver-documentation*/
