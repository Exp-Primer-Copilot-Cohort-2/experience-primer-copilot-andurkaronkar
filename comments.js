//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const db = mongoose.connection;

const Post = require('./models/post.js');

//connect to database
mongoose.connect('mongodb://localhost:27017/posts', {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
});

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.get('/posts', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

app.post('/posts', function(req, res) {
  const post = new Post(req.body);
  post.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('post saved');
      res.send('post saved');
    }
  });
});

app.listen(3001, function() {
  console.log('listening on port 3001');
});