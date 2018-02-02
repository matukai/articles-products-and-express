//PRODUCTS ROUTES
//MODULES
const express = require('express');
const router = express.Router();
const dB = require('../dB/products');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/', function (req, res) {
  let body = req.body;

  let validity = true;
  // FIX ME
  // validateProduct(body, validity);
  // if (validity === true) {
    
    if(dB.insert(body)){
      res.redirect('/products');
    } else {
    res.redirect('/products/new');
   }
});

router.get('/new', function (req, res) {
  return res.render('new');
});

router.get('/', function (req, res) {
  //res.send(dB.getAll());
  return res.render('index', {dB: dB.getAll()});
});

router.get('/:id', function (req, res) {
  let id = req.params.id;
  return res.render('product', {dB: dB.getProduct(id)});
});

router.get('/:id/edit', function (req, res) {
  let id = req.params.id;
  
});

router.put('/:id', function (req, res) {
  let body = req.body;
  let id = req.params.id;
  dB.editProduct(body, id);
  res.end();
});

router.delete('/:id', function (req, res) {
  let id = req.params.id;
  let body = req.body;
  dB.deleteProduct(id);
  res.end();
});

function validateProduct (input, validity) {
  let name = validateString(input.name);
  let price = validateNumber(input.price);
  let inventory = validateNumber(input.inventory);

  if(name === true && price === true && inventory === true){
    //console.log('hit true');
    return validity = true;
  }else{
    //console.log('hit false');
    return validity = false;
  }
};

function validateString (input) {
  //console.log('string ' + input)
  if(isNaN(input)){
    return true;
  } else {
    return false;
  }
};

function validateNumber (input) {
  input = parseInt(input);
  //console.log(input)
  if(typeof input === 'number' && input > 0){
    return true;
  } else {
    return false;
  }
};



module.exports = router