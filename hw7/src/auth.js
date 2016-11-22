'use strict'

const md5 = require('md5')
const cookieParser = require('cookie-parser')
const User = require('./model.js').User
const Profile = require('./model.js').Profile

const sessionUser = {}
const cookieKey = 'sid'
const mySecretMessage = 'dame'

const getUser = (username, callback) => {
     User.find({ username: username }).exec((err, user) => {
          if (user.length) {
              callback(user[0])
          } else {
              callback(null)
          }
     })
}

const validate = (pwd, salt, hash) => {
     return (md5(pwd + salt) === hash)
}

const register = (req, res) => {
     const username = req.body.username
     const password = req.body.password
     const email = req.body.email
     const zipcode = req.body.zipcode
     const avatar = "https://goo.gl/n7uZww"
     const headline = "Become a web developer"
     const dob = req.body.dob
     const following = []
     const salt = Math.random()
     const hash = md5(password + salt)
     if (!username || !password || !email || !zipcode || !dob ) {
       return res.sendStatus(400)
     } else {
       getUser(username, (user) => {
         if (!user) {
           new User({ username, salt, hash }).save()
           new Profile({ username, email, zipcode, following,
             headline, avatar, dob }).save()
           return res.send({ username : username, result : 'success' })
         } else {
           return res.send({ username : username, result : 'failed' })
         }
       })
     }
}

const login = (req, res) => {
     const username = req.body.username
     const password = req.body.password
     if (!username || !password) {
       res.sendStatus(400)
       return
     }
     let loggedIn = false
     // If already logged in, just return success
     Object.keys(sessionUser).forEach((key) => {
       if (sessionUser[key] === username) {
         res.send({ username : username, result: 'success'})
         loggedIn = true
       }
     })
     if (!loggedIn) {
       getUser(username, (userObj) => {
         if (userObj) {
              if (validate(password, userObj.salt, userObj.hash)) {
                   const sessionKey = md5(mySecretMessage +
                    new Date().getTime() + userObj.username)
                   sessionUser[sessionKey] = userObj.username
                   // this sets a cookie
                   res.cookie(cookieKey, sessionKey,
                        { maxAge: 3600*1000, httpOnly: true})
                   const msg = { username : username, result: 'success'}
                   return res.send(msg)
              } else {
                   return res.sendStatus(401)
              }
         } else {
              return res.sendStatus(401)
         }
       })
     }
}

const logout = (req, res) => {
  const username = req.username

  Object.keys(sessionUser).forEach((key) => {
    if (sessionUser[key] === username) {
      delete sessionUser[key]
      res.sendStatus(200)
    }
  })
}

const isLoggedIn = (req, res, next) => {
  const sid = req.cookies[cookieKey]

  if (!sid) {
    return res.sendStatus(401)
  }

  const username = sessionUser[sid]
  if (username) {
    req.username = username
    next()
  } else {
    res.sendStatus(401)
  }
}

const changePwd = (req, res) => {
  const username = req.username
  const newPwd = req.body.password
  if (!newPwd) {
    return res.sendStatus(400)
  }
  const salt = Math.random()
  const hash = md5(newPwd + salt)
  const changedUser = { username, salt, hash }
  User.findOneAndUpdate({ username : username },
    changedUser, { upsert:false }, (err, user) => {
      if (err) return res.send(500, { error: err })
      return res.send({username : username, message : "Password updated"})
  })

}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.use(cookieParser())
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', isLoggedIn, logout)
     app.put('/password', isLoggedIn, changePwd)
     app.use(isLoggedIn)
}
