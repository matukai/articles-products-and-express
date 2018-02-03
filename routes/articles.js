//ARTICLES ROUTES
//MODULES
const express = require('express');
const router = express.Router();
const dB = require('../dB/articles');


router.get('/', function (req, res) {
  res.send(dB.getAll());
});

let postValid = true;
router.post('/', function (req, res) {
  let body = req.body;
  if(postValid === true){
    dB.insert(body);
    res.end();
  }else{

  }
});

let putValid = false;
router.put('/', function (req, res) {
  let body = req.body;
  dB.editArticle(body);
  res.send('hitting put')
});




module.exports = router