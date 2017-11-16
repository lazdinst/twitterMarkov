const path = require('path');
const axios = require('axios');
const Twitter = require('twitter');
const express = require('express');
const bodyParser = require('body-parser');
const {consumerKey, consumerSecret, accessTokenKey, accessTokenSecret} = require('../config/twitter.config');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, '../dist')));

var client = new Twitter({
 consumer_key: consumerKey,
 consumer_secret: consumerSecret,
 access_token_key: accessTokenKey,
 access_token_secret: accessTokenSecret
});

app.get('/', (req, res) => {
  let url = ''
  const preloadedState = {};
  preloadedState.app = {};
  axios.get(url)
    .then(results => {
      //Add desired props to preloadedState
      preloadedState.app.injectedState = true;
      res.render('index', {preloadedState});
    })
    .catch((err) => {
      preloadedState.app.injectedState = false;
      res.render('index', {preloadedState});
    });
});

app.post('/tweets', function (req, res, next) {
  console.log('(Server): Retrieving Tweets from ', req.body.user);
  var params = {screen_name: req.body.user};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
   if (!error) {
     let data = tweets.map((tweet) => { return tweet.text});
     res.send(data)
   }
  });
});

module.exports = app;