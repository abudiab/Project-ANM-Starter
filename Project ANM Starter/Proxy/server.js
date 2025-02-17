
var express = require('express'); 
var request = require('request'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();
const db = require('./db.js')
const Content = require('./db.js').Content;
app.use(express.static(__dirname + '/'));


//Comments config
const Comment = require('./db.js').Comment; //require the schema in database

app.get('/comments',  (req, res) => {
  // res.send('Helo World from server 3');
  Comment.find({})
    .sort({ date: -1 })
    .then(comments => res.json(comments))
    // .catch(err => console.log(err))

});

app.post('/comments', (req, res) => {
  const newComment = Comment({
    text: req.body.text,
    likes: req.body.likes,
    date: req.body.date
  }) 
  
  newComment.save()
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
})

//Content config
app.get('/content', function (req, res) {
  // console.log("contentcour")
  console.log("get datat from server");
  Content.find({}).exec((err,content) => { 
      if(err){
        console.log(err);
        req.send()
      }
      res.json(content)});
});

  app.listen(7000); 
console.log('Server running on port %d', 7000);

