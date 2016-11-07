'use strict'

let articles = [
		{ "id" : 1, "author" : "John", "text" : "My first article",
           "date" : "2016-11-06T02:41:58.128Z", "img" : "", "comment" : [] },
		{ "id" : 2, "author" : "Ben", "text" : "My second article",
           "date" : "2016-11-06T02:41:58.128Z", "img" : "", "comment" : [] },
		{ "id" : 3, "author" : "Wong", "text" : "My third article",
           "date" : "2016-11-06T02:41:58.128Z", "img" : "", "comment" : [] }
		]

const addArticle = (req, res) => {
     let newArticle = { "id" : articles.length + 1, "author" : "qh5", 
               "text" : req.body["text"], "date" : new Date(), 
               "img" : "", "comment" : []}
     articles[articles.length] = newArticle
     res.send({"articles" : [newArticle]})
}

const editArticle = (req, res) => {
     let id = req.params.id
     newArticle = { "id" : id, "author" : 'Bin', 
          "text" : "alsjdhkajshdkasjhd", "date" : "2016-11-06T02:41:58.128Z",
           "img" : "a.jpg", "comment" : []}
     res.send({"articles" : [newArticle]})
}

const getArticles = (req, res) => {
     let id = req.params.id;
     if (id) {
          if (id > 0 && id <= articles.length) {
               res.send({"articles": [articles[id - 1]]})
          } else {
               res.send({"articles": []})
          }
     } else {
          res.send({"articles" : articles})
     }
}

module.exports = app => {
     app.post('/article', addArticle)
     app.put('/articles/:id', editArticle)
     app.get('/articles/:id*?', getArticles)
}