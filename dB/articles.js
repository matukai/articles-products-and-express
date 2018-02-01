//ARTICLES DB
//leave variables at the top
let articlesArray = [];
let articleId = 0;


module.exports = {
  getAll: getAll,
  insert: insert
}


function getAll () {
  return articlesArray;
}

function insert (article) {
  article.id = articleId++
  articlesArray.push(article);
}