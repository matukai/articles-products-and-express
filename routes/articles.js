//ARTICLES ROUTES
//MODULES
const express = require('express');
const router = express.Router();
const dB = require('../dB/articles');
const knex = require('../knex/knex');


router.get('/new', (req, res) => {
  return res.render('articlesNew');
})

router.get('/', (req, res) => {
  return knex.select('*').from('articles')
  .then(result => {
    return res.render('articlesIndex', { dB:result})
    //return res.json(result);
  })
  .catch(err => {
    return res.status(500).json({
      message: err.message
    })
  })
})

router.get('/:title', (req, res) => {
  let reqTitle = req.params.title;
  return knex('*').from('articles').where('title', reqTitle)
  .then(result => {
    return res.render('articlesIndex', {dB:result})
  })
  .catch(err => {
    return res.status(400).json({
      message: 'Bad Request'
    })
  })
})

router.get('/:title/edit', (req, res) => {
  let reqTitle = req.params.title;
  console.log(reqTitle)
  return knex('articles').where('urlTitle', reqTitle)
  .then(result => {
    console.log(result)
    return res.render('articlesEdit', result[0])
  })
  .catch(err => {
    return res.status(400).json({
      message: 'Bad EDIT Request'
    })
  })
})


router.post('/', (req, res) => {
  let body = req.body;
  let title = body.title;
  let bod = body.body;
  let author = body.author;
  return knex('articles').insert({title: title, body: bod, author: author, urlTitle: encodeURI(title)})
  .then(result => {
    return res.json(result.rows[0])
  })
  .catch(err => {
    return res.status(500).json({
      message: err.message
    })
  })
})

/////////////////////PUT INPUT URI ENCODED TITLE ////////////////
router.put('/:title', (req, res) => {
  let body = req.body;
  let title = body.title;
  let bod = body.body;
  let author = body.author;
  let titleId = encodeURI(req.params.title)
  return knex('articles').where('urlTitle', titleId)
  .update({
    title: title,
    body: bod,
    author: author,
    urlTitle: encodeURI(title)
  })
  .then(result => {
    return res.json(result.rows);
  })
  .catch(err => {
    return res.status(500).json({
      message: err.message
    })
  })
})

router.delete('/:title', (req, res) => {
  let paramsTitle = req.params.title;
  return knex('articles').where('urlTitle', paramsTitle).del()
  .then(result => {
    return res.json(result.rows)
  })
  .catch(err => {
    return res.status(500).json({
      message: err.message
    })
  })
})











































// router.get('/', function (req, res) {
//   res.send(dB.getAll());
// });

// let postValid = true;
// router.post('/', function (req, res) {
//   let body = req.body;
//   if(postValid === true){
//     dB.insert(body);
//     res.end();
//   }else{

//   }
// });

// let putValid = false;
// router.put('/', function (req, res) {
//   let body = req.body;
//   dB.editArticle(body);
//   res.send('hitting put')
// });




module.exports = router