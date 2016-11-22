'use strict'

const md5 = require('md5')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const Article = require('./model.js').Article
const Profile = require('./model.js').Profile
const Comment = require('./model.js').Comment

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
    if (article.length) {
      callback(article)
    // if not, return all articles, just like dummy server
    } else {
      Article.find().exec((err, articles) => {
        callback(articles)
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
        img     : null,
        comment : []
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
          // Update article if commenId does not exist
          if (!commentId) {
            // If the user does not own this article,
            // send forbidden status
            if (newArticle.author !== username) {
              return res.sendStatus(403)
            }
            // Replace the text with new text
            newArticle.text = newText
            // Update comment if commentId exists
          } else {
            let comments = newArticle.comments
            // Edit comment
            if (commentId != -1) {
              comments.forEach((comment) => {
                if (comment.commentId === commentId) {
                  // If user does not own this comment,
                  // send forbidden status
                  if (comment.author !== username) {
                    return res.sendStatus(403)
                  }
                  // Replace the comment with new comment
                  comment.text = newText
                }
              })
              // New comment
            } else {
              // Create global unique comment id
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
     app.post('/article', upload.single(), addArticle)
     app.put('/articles/:id', editArticle)
     app.get('/articles/:id*?', getArticles)
}
