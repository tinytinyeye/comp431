'use strict'

const md5 = require('md5')

const database = {}

const sessionUser = {}

const cookieKey = 'abc'

const register = (req, res) => {
     console.log('Payload received', req.body)
     let payload = req.body
     let username = payload.username
     let password = payload.password
     let salt = Math.random()
     let hash = md5(password + salt)
     database[username] = { salt, hash }
     res.send({ username : username, status : 'success' })
}

const login = (req, res) => {
     console.log('Payload received', req.body)
     let payload = req.body
     let username = payload.username
     let password = payload.password
     let salt = database[username].salt
     let hash = database[username].hash
     if (md5(password + salt) === hash) {
          res.cookie(cookieKey, 12345, 
               {maxAfe: 3600*1000, httpOnly: true })
          sessionUser[12345] = username
          const msg = { username : username, status: 'success'}
          res.send(msg)
     } else {
          res.sendStatus(401)
     }
}

const logout = (req, res) => {
     res.send("OK")
}

const changePassword = (req, res) => {
     res.send({ username : 'qh5', status : 'will not change' })
}

module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', logout)
     app.put('/password', changePassword)
}