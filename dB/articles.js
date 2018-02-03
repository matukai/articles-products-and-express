//ARTICLES DB
//leave variables at the top
let articlesArray = [];

let testArticle = {
  title: 'Moby Dick',
  body: 'This is a story about a giant...',
  author: 'Herman Melville',
  urlTitle: encodeURI('Moby Dick')
}
let testArticle2 = {
  title: 'Enders Game',
  body: 'This is a story about a boy named Ender',
  author: 'Orson Scott Card',
  urlTitle: encodeURI('Enders Game')
}
articlesArray.push(testArticle);
articlesArray.push(testArticle2);


module.exports = {
  getAll: getAll,
  insert: insert,
  editArticle: editArticle,
}

function getAll () {
  return articlesArray;
}

function insert (data) {
  let addArticle = {
    title: data.title,
    body: data.body,
    author: data.author,
    urlTitle: encodeURI(data.title)
  }
  articlesArray.push(addArticle);
}

function editArticle (data) {
  console.log(data);
  articlesArray.filter((element) => {
    if(data.title === element.title){
      console.log(element)
      return element;
    }else{
      return false
    }
  }).map((element) => {
    element.title = data.title;
    element.body = data.body;
    element.author = data.author;
    return element;
  });
};

