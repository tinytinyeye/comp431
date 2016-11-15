'use strict'

const md5 = require('md5')
const cookieParser = require('cookie-parser')
const redis = require('redis')
.createClient("redis://h:paebuii5j8qjd63fklu4t2p3kok@ec2-54-243-224-12.compute-1.amazonaws.com:11739")

const database = {}

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
          let userObj = { username : { salt : salt, hash : hash } }
          let sid = 12345
          redis.hmset(sid, userObj)
          redis.hgetall(sid, function(err, userObj) {
               console.log(sid + ' mapped to ' + userObj)
          })
          const msg = { username : username, status: 'success'}
          res.send(msg)
     } else {
          res.sendStatus(401)
     }
}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
}