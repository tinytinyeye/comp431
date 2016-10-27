let articles = [
		{ "id" : 1, "author" : "John", "text" : "My first article" },
		{ "id" : 2, "author" : "Ben", "text" : "My second article" },
		{ "id" : 3, "author" : "Wong", "text" : "My third article" }
		]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     newArticle = { "id" : articles.length + 1, "author" : "Bin", "text" : req.body["body"]}
     articles[articles.length] = newArticle
     res.send({"articles" : newArticle})
}

const getArticles = (req, res) => {
     let id = req.params.id;
     if (id) {
          if (id > 0 && id <= articles.length) {
               res.send({"articles": articles[id]})
          } else {
               res.send({"articles": []})
          }
     } else {
          res.send({"articles" : articles})
     }
}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.post('/article', addArticle)
     app.get('/', hello)
     app.get('/articles/:id*?', getArticles)
}