//PRODUCTS ROUTES
const express = require('express');
const router = express.Router();
const dB = require('../dB/products');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function (req, res) {
  res.send(dB.getAll());
});

router.post('/', function (req, res) {
  let body = req.body;
  let validName;
  let validPrice;
  let validInventory;

  // let validBody = {
  //   name: validName,
  //   price: validPrice,
  //   inventory: validInventory
  // }
  // if (body.name === 'string' && body.name !== undefined) {
  //   validBody.name = body.name;
  // } else if (body.price === 'number' && body.price !== undefined) {
  //   validBody.price = body.price
  // } else if (body.inventory === 'number' && body.inventory !== undefined) {
  //   validBody.inventory = body.inventory;
  // } else {

  // }

  dB.insert(body);
  res.end();
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





module.exports = router

