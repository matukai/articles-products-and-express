//PRODUCTS ROUTES
//MODULES
const express = require('express');
const router = express.Router();
const dB = require('../dB/products');
const knex = require('../knex/knex');


router.get('/new', (req, res) => {
  return res.render('new');
})

router.get('/', (req, res) => {
  return knex.select('*').from('products')
    .then(result => {
      return res.render('index', {
        dB: result
      });
      //return res.json(result)
    })
    .catch(err => {
      return res.status(400).json({
        message: 'Bad Request'
      })
    })
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  return knex('*').from('products').where('id', id)
    .then(result => {
      console.log(result.rows[0])
      return res.render('products', {
        dB: result[0]
      })
      //return res.json(result);
    })
    .catch(err => {
      return res.status(400).json({
        message: 'Bad Request'
      })
    })
})

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  //console.log(id)
  return knex('products')
    .where({
      id: id
    })
    .select()
    .then(result => {
      console.log(result)
      return res.render('edit', result[0])
    })
    .catch(err => {
      return res.status(400).json({
        message: 'Bad EDIT Request'
      })
    })
})

let postValidation = false;
router.post('/', (req, res) => {
  let body = req.body;
  let name = body.name;
  let price = body.price;
  let inventory = body.inventory;

  validateProduct(body)
  console.log('before knex ' + postValidation)

  if (postValidation) {
    return knex('products').insert({
        name: name,
        price: price,
        inventory: inventory
      })
      .then(result => {
        return res.redirect('/products');
        //return res.json(result.rows[0])
      })
  } else {
    return res.redirect('/products/new')
    // return res.status(500).json({
    //   message: err.message
    // })
  }
})

router.put('/:id', (req, res) => {
  let body = req.body;
  let name = body.name;
  let price = body.price;
  let inventory = body.inventory;
  let id = req.params.id;
  return knex('products').where('id', id)
    .update({
      name: name,
      price: price,
      inventory: inventory
    })
    .then(result => {
      return res.redirect(`/products/${id}`)
      //return res.json(result.rows);
    })
    .catch(err => {
      res.redirect(`/products/${id}/edit`);
      return res.status(500).json({
        message: err.message
      })
    })
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  return knex('products').where('id', id).del()
    .then(result => {
      res.redirect(`/products`)
      //return res.json(result.rows);
    })
    .catch(err => {
      res.redirect(`/products/${id}`)
      // return res.status(500).json({
      //   message: err.message
      // })
    })
})





// let postValid = false;
// router.post('/', function (req, res) {
//   let body = req.body;
//   //validation
//   console.log('POST ' + body)
//   validateProduct(body);
//   if (postValid === true) {
//     dB.insert(body);
//     res.redirect('/products');
//   } else {
//     res.redirect('/products/new');
//   }
// });

// let putValid = false;
// router.put('/:id', function (req, res) {
//   let body = req.body;
//   let id = req.params.id;
//   //validation
//   validateProduct(body);
//   if(putValid === true) {
//     dB.editProduct(body, id);
//     res.redirect(`/products/${id}`);
//   }else{
//     res.redirect(`/products/${id}/edit`);
//   }
// });

// router.get('/:id/edit', function (req, res) {
//   let id = req.params.id;
//   //res.send(dB.getProduct(id));
//   return res.render('edit', dB.getProduct(id));
// });

// router.get('/new', function (req, res) {
//   return res.render('new');
// });

// router.get('/:id', function (req, res) {
//   let id = req.params.id;
//   //res.send(dB.getProduct(id))
//   return res.render('products', {
//     dB: dB.getProduct(id)
//   });
// });

// router.get('/', function (req, res) {
//   //res.send(dB.getAll());
//   return res.render('index', {
//     dB: dB.getAll()
//   });
// });

// router.delete('/:id', function (req, res) {
//   let id = req.params.id;
//   let body = req.body;
//   if(dB.deleteProduct(id)){
//     res.redirect(`/products`);
//   }else{
//     res.redirect(`/products/${id}`);
//   }
// });




function validateProduct(input) {
  let name = validateString(input.name);
  let price = validateNumber(input.price);
  let inventory = validateNumber(input.inventory);

  if (name === true && price === true && inventory === true) {
    console.log('hit true');
    postValid = true;
    postValidation = true;
    return name, price, inventory;
    putValid = true;
  } else {
    console.log('hit false');
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