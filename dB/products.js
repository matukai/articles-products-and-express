//PRODUCTS DB
//leave variables at the top
let productsArray = [];
let productId = 0;


module.exports = {
  getAll: getAll,
  insert: insert
}


function getAll () {
  return productsArray;
}

function insert (product) {
  product.id = productId++;
  productsArray.push(product);
}