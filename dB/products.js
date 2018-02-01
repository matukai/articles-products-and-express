//PRODUCTS DB
let productsArray = [];
let productId = 5;

let testProduct = {
  name: 'shotgun',
  price: 300,
  inventory: 50,
  id: 3
};
productsArray.push(testProduct);

module.exports = {
  getAll: getAll,
  insert: insert,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
};


function getAll() {
  return productsArray;
};

function insert(product) {
  let addProd = {
    name: product.name,
    price: product.price,
    inventory: product.inventory
  };
  addProd.id = productId++;
  productsArray.push(addProd);
};

function editProduct(product, id) {
  id = parseInt(id);
  productsArray.filter((element) => {
    if (element.id === id) {
      return element;
    }else{
      return false;
    };
  }).map((element) => {
    element.inventory = product.inventory;
    element.name = product.name;
    element.price = product.price;
    return element;
  });
};

function deleteProduct(id) {
  id = parseInt(id)
  let ind = productsArray.findIndex(element => element.id === id);
  if(ind >= 0){
    productsArray.splice(ind,1);
  }else{
    return false;
  };
};