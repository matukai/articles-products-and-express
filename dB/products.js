//PRODUCTS DB
let productsArray = [];
let productId = 5;

let testProduct = {
  name: 'shotgun',
  price: 300,
  inventory: 50,
  id: 3
}
productsArray.push(testProduct);

module.exports = {
  getAll: getAll,
  insert: insert,
  editProduct: editProduct
}


function getAll() {
  return productsArray;
}

function insert(product) {
  let addProd = {
    name: product.name,
    price: product.price,
    inventory: product.inventory
  }
  addProd.id = productId++;
  productsArray.push(addProd);
}

function editProduct(product, id) {
  console.log('ID ' + id);
  id = parseInt(id);
  productsArray.filter((element) => {
    if (element.id === id) {
      return element;
    }else{
      return false;
    }
  }).map((element) => {
    element.inventory = product.inventory;
    element.name = product.name;
    element.price = product.price;
    return element;
  });
}
