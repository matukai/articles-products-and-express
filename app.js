//MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

//CONSTANTS
const PORT = process.env.PORT || 7878;
const articleRoutes = require('./routes/articles');
const productRoutes = require('./routes/products');

//APPLICATIONS
app.use('/articles', articleRoutes);
app.use('/products', productRoutes);
app.use(bodyParser.urlencoded({extended: true}));
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');





app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`SERVER UP PORT:${PORT}`);
});