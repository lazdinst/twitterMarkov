const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
  var url = '';
  const data = req.body;
  axios.post(url, data)
    .then(results => {
      res.end();
    })
    .catch((err)=>{
      res.end();
    });
});

module.exports = router;