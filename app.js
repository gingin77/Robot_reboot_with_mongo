const express = require('express')
const mustacheExpress = require('mustache-express')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// const MongoClient = require('mongodb').MongoClient;
  // , assert = require('assert')

// Connection URL
let mongoURL = 'mongodb://localhost:27017/newdb'

const app = express()
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

// Use connect method to connect to the server
// MongoClient.connect(mongoURL, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   //
//   // findDocuments(robots)
//
//   db.close();
// })

// What Clinton posted in below.. However, I've changed restaurants to robots and made other db-specific modifications.
app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render('robot', {robots: docs})
    })
  })
})

app.get('/', function (req,res){
  res.render('robot', dataset)
  })

// var findDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }


app.listen(3000, function () {
  console.log('Successfully started express application!');
})



/*see node documentation for assert here - https://nodejs.org/api/assert.html#assert_assert; question on StackO - https://stackoverflow.com/questions/28129223/node-js-assert-module-in-mongodb-driver-documentation*/
