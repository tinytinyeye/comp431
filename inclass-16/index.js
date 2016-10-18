
const express = require('express')
const bodyParser = require('body-parser')

let nextId = 4;

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

const allArticles = (req, res) => res.send({"articles" : articles})

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', allArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
