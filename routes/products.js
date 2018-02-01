//PRODUCTS ROUTES
const express = require('express');
const router = express.Router();
const dB = require('../dB/products');

router.get('/', function (req, res) {
  res.send('product routes');
});


module.exports = router