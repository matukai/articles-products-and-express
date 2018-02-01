//ARTICLES ROUTES
const express = require('express');
const router = express.Router();
const db = require('../dB/articles');

router.get('/', function (req, res) {
  res.send('article routes');
});


module.exports = router