'use strict'

const md5 = require('md5')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const uploadImage = require('../uploadCloudinary.js')

const Article = require('./model.js').Article
const Profile = require('./model.js').Profile
const Comment = require('./model.js').Comment

// Get the profile info of a user by username
const getUser = (username, callback) => {
     Profile.find({ username: username }).exec((err, user) => {
          if (user.length) {
              callback(user[0])
          } else {
              callback(null)
          }
     })
}

/**
  * Fetch an article by id
  */
const findById = (id, callback) => {
  Article.find({ _id: id }).exec((err, article) => {
    // if an article corresponding to a given id exists
    if (article) {
      callback(article)
    } else {
      // If the arg is not id, try to find username
      Article.find({ author: id }).exec((err, articles) => {
        if (articles.length) {
          callback(articles)
        // if not, return all articles, just like dummy server
        } else {
          Article.find().exec((err, articles) => {
            callback(articles)
          })
        }
      })
    }
  })
}

/**
  * Fetch all articles
  */
const findAll = (users, callback) => {
  Article.find()
        .where('author').in(users)
        .sort({ date : -1 })
        .limit(10)
        .exec((err, articles) => {
            callback(articles)
        })
}

/**
  * Update article by id
  */
const updateById = (id, newArticle, callback) => {
  Article.findOneAndUpdate({ _id : id }, newArticle, { upsert:false },
    (err, article) => {
      callback(newArticle)
    })
}

/**
  * Add an article to database
  */
const addArticle = (req, res) => {
     const newArticle = {
        author  : req.username,
        text    : req.body.text,
        date    : new Date().toISOString(),
        img     : req.fileurl,
        comments : req.body.comments
      }
     new Article(newArticle).save()
     return res.send({"articles" : [newArticle]})
}

/**
  * Edit an article in database
  */
const editArticle = (req, res) => {
     const id = req.params.id
     const newText = req.body["text"]
     const commentId = req.body["commentId"]
     const username = req.username
     findById(id, (article) => {
        // If no article is found, send internal server error
        if (article.length > 1) {
          return res.sendStatus(500)
        } else {
          let newArticle = article[0]
          if (!commentId) {
            // If the user does not own this article
            if (newArticle.author !== username) {
              return res.sendStatus(403)
            }
            newArticle.text = newText
            // Update comment if commentId exists
          } else {
            let comments = newArticle.comments
            // Edit comment
            if (commentId != -1) {
              let result = comments.filter((c) => (c.commentId == commentId))
              if (result.length == 0) {
                return res.send({ "articles" : [newArticle] })
              } else {
                if (result[0].author != username) {
                  return res.sendStatus(403)
                }
                result[0].text = newText
                newArticle.comments = [
                  ...comments.filter((c) => (c.commentId == commentId)),
                  result[0]
                ]
              }
              // New comment
            } else {
              const newCommentId = md5(username + new Date().getTime())
              const newComment = { commentId : newCommentId, text : newText,
              date : new Date().toISOString(), author : username }
              comments[comments.length] = newComment
            }
          }
          // Update database with edited Article object
          updateById(id, newArticle, (article) => {
            return res.send({"articles" : [newArticle]});
          })
        }
      })

}

/**
  * Get all articles or get an article by id
  */
const getArticles = (req, res) => {
     const id = req.params.id;
     const username = req.username
     if (id) {
          findById(id, (article) => {
            return res.send({"articles" : article })
          })
     } else {
          getUser(username, (user) => {
            let users = user.following
            users[users.length] = username
            findAll(users, (articles) => {
              return res.send({ articles })
            })
          })
     }
}

module.exports = app => {
     app.post('/article', uploadImage(), addArticle)
     app.put('/articles/:id', editArticle)
     app.get('/articles/:id*?', getArticles)
}
