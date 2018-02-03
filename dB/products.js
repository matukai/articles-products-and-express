//PRODUCTS DB
let productsArray = [];
let productId = 5;
let testProduct = {
  name: 'shotgun',
  price: 300,
  inventory: 50,
  id: 3
};
let testProduct2 = {
  name: 'AK-47',
  price: 420,
  inventory: 100,
  id: 1,
};
productsArray.push(testProduct);
productsArray.push(testProduct2);


module.exports = {
  getAll: getAll,
  insert: insert,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
  getProduct: getProduct,
};


function getAll() {
  return productsArray;
};

function getProduct(id) {
  id = parseInt(id);
  let foundProduct 
    productsArray.filter((element) => {
      if(id === element.id){
        foundProduct = element;
        return element;
      }else{
        return false
      }
    })
    return foundProduct;
}

function insert(product) {
  let addProd = {
    name: product.name,
    price: product.price,
    inventory: product.inventory
  };
  addProd.id = productId++;
  productsArray.push(addProd);
  return true;
};

function editProduct(product, id) {
  id = parseInt(id);
  productsArray.filter((element) => {
    if (element.id === id) {
      return element;
    }else{
      return false
    };
  }).map((element) => {
    element.inventory = product.inventory;
    element.name = product.name;
    element.price = product.price;
    return element
  });
};


function deleteProduct(id) {
  id = parseInt(id)
  let ind = productsArray.findIndex(element => element.id === id);
  if(ind >= 0){
    productsArray.splice(ind,1);
    return true;
  }else{
    return false;
  };
};