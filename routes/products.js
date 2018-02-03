//PRODUCTS ROUTES
//MODULES
const express = require('express');
const router = express.Router();
const dB = require('../dB/products');

let postValid = false;
router.post('/', function (req, res) {
  let body = req.body;
  //validation
  console.log('POST ' + body)
  validateProduct(body);
  if (postValid === true) {
    dB.insert(body);
    res.redirect('/products');
  } else {
    res.redirect('/products/new');
  }
});

let putValid = false;
router.put('/:id', function (req, res) {
  let body = req.body;
  let id = req.params.id;
  //validation
  console.log(body)
  validateProduct(body);
  console.log('put validation ' + putValid);

  if(putValid === true) {
    dB.editProduct(body, id);
    res.redirect(`/products/${id}`);
  }else{
    res.redirect(`/products/${id}/edit`);
  }
});

router.get('/:id/edit', function (req, res) {
  let id = req.params.id;
  //res.send(dB.getProduct(id));
  return res.render('edit', dB.getProduct(id));
});


router.get('/new', function (req, res) {
  return res.render('new');
});

router.get('/:id', function (req, res) {
  let id = req.params.id;
  //res.send(dB.getProduct(id))
  return res.render('products', {
    dB: dB.getProduct(id)
  });
});

router.get('/', function (req, res) {
  //res.send(dB.getAll());
  return res.render('index', {
    dB: dB.getAll()
  });
});

router.delete('/:id', function (req, res) {
  let id = req.params.id;
  let body = req.body;
  if(dB.deleteProduct(id)){
    res.redirect(`/products`);
  }else{
    res.redirect(`/products/${id}`);
  }
});




function validateProduct(input) {
  let name = validateString(input.name);
  let price = validateNumber(input.price);
  let inventory = validateNumber(input.inventory);

  if (name === true && price === true && inventory === true) {
    //console.log('hit true');
    postValid = true;
    putValid = true;
  } else {
    //console.log('hit false');
    postValid = false;
    putValid = false;
  }
};

function validateString(input) {
  //console.log('string ' + input)
  if (isNaN(input) && input.length > 0) {
    return true;
  } else {
    return false;
  }
};

function validateNumber(input) {
  input = parseInt(input);
  //console.log(input)
  if (typeof input === 'number' && input > 0) {
    return true;
  } else {
    return false;
  }
};



module.exports = router