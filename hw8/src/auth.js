'use strict'

if (!process.env.REDIS_URL) {
  process.env.REDIS_URL = 'redis://h:pd98l4dnause567qgd94abql1k8' +
  '@ec2-54-225-248-10.compute-1.amazonaws.com:11939'
}

const md5 = require('md5')
const cookieParser = require('cookie-parser')
const redis = require('redis').createClient(process.env.REDIS_URL)
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = {clientID: '766959140000-nmfhddicf9tm5kktr4o7o9tugsbbkv20.'+
'apps.googleusercontent.com',
				clientSecret: 'yFSF_bF_Gx4eknhHZdqCaWni',
				callbackURL: "https://ricebook-server.herokuapp.com/callback"}

const User = require('./model.js').User
const Profile = require('./model.js').Profile

const cookieKey = 'sid'
const mySecretMessage = 'dame'

passport.serializeUser(function(user, done) {
      User.find({ oauth: user.id }).exec((err, u) => {
        if (u.length == 0) {
          getUser(user.id, (usr) => {
            if (!usr) {
              const username = user.id
              const salt = ""
              const hash = ""
              const oauth = user.emails[0].value
              const avatar = user.photos[0].value
              const email = user.emails[0].value
              const zipcode = 77054
              const following = []
              const headline = "Become a web developer!"
              const dob = new Date()
              new User({ username, salt, hash, oauth }).save()
              new Profile({ username, email, zipcode, following,
                headline, avatar, dob }).save()
            }
          })
          done(null, user.id)
        } else {
          done(null, u[0].username)
        }
      })

})

passport.deserializeUser(function(id, done) {
  User.find({username : id}).exec((err, usr) => {
    done(null, usr)
  })
})

passport.use(new GoogleStrategy(config,
	function(accessToken, refreshToken, profile, cb) {
	 	return cb("", profile)
	}
))

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
     getUser(username, (userObj) => {
       if (userObj) {
            if (validate(password, userObj.salt, userObj.hash)) {
                 const sessionKey = md5(mySecretMessage +
                  new Date().getTime() + userObj.username)
                 redis.hmset(sessionKey, userObj)
                 // this sets a cookie
                 res.cookie(cookieKey, sessionKey,
                      { maxAge: 3600*1000, httpOnly: true})
                if (userObj.oauth) {
                  res.cookie("scope", "linked",
                  { maxAge: 3600*1000, httpOnly: true})
                } else {
                  res.cookie("scope", "local",
                  { maxAge: 3600*1000, httpOnly: true})
                }
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


const oauthLogin = (req, res) => {
  // If local user is logged in and tries to link google
  if (req.cookies[cookieKey]) {
    const sid = req.cookies[cookieKey]
    redis.hgetall(sid, function(err, userObj) {
    let newUserObj = userObj
    newUserObj.oauth = req.user[0].username
      User.findOneAndUpdate({ username : userObj.username }, newUserObj,
        (err, user) => {
        })

      User.findOneAndRemove({ username : req.user[0].username },
        (err, user) => {

        })

      Profile.findOneAndRemove({ username: req.user[0].username },
          (err, profile) => {

        })


    })

  } else {
    const userObj = req.user[0]
    if (userObj.salt != "") {
      res.clearCookie("scope")
      res.cookie("scope", "linked", { maxAge: 3600*1000, httpOnly: true})
    } else {
      res.clearCookie("scope")
      res.cookie("scope", "google", { maxAge: 3600*1000, httpOnly: true})
    }


  }
  res.redirect("http://melodic-rod.surge.sh/")
}

// Endpoint for Google to local linking
const link = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    res.sendStatus(400)
    return
  }
  getUser(username, (userObj) => {
    if (userObj) {
         if (validate(password, userObj.salt, userObj.hash)) {
              const sessionKey = md5(mySecretMessage +
               new Date().getTime() + userObj.username)
              redis.hmset(sessionKey, userObj)
              // this sets a cookie
              res.cookie(cookieKey, sessionKey,
                   { maxAge: 3600*1000, httpOnly: true})
              res.cookie("scope", "linked",
              { maxAge: 3600*1000, httpOnly: true})
              req.logout()

              const googleUser = req.username

              Profile.find({ username : googleUser }).exec((err, gProfile) => {
                Profile.find({ username : userObj.username })
                  .exec((err, profile) => {
                    let newProfile = profile[0]
                    let gp = gProfile[0]
                    newProfile.email = gp.email
                    newProfile.avatar = gp.avatar
                    newProfile.following = newProfile.following
                      .concat(gp.following)
                    Profile.findOneAndUpdate({ username : userObj.username},
                     newProfile, (err, profile) => {

                     })
                })
              })

              let newUserObj = userObj;
              newUserObj.oauth = googleUser

              User.findOneAndUpdate({ username : userObj.username }, newUserObj,
              (err, user) => {

              })

              User.findOneAndRemove({ username : googleUser }, (err, user) => {

              })

              Profile.findOneAndRemove({ username: googleUser },
                (err, profile) => {

              })

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

const unlink = (req, res) => {
  const username = req.username
  User.find({ username : username }).exec((err, user) => {
    let newUser = user[0]
    newUser.oauth = ""
    User.findOneAndUpdate({ username : username }, newUser, (err, user) => {

    })
  })
  res.clearCookie("scope")
  res.cookie("scope", "local")
  res.sendStatus(200)
}

const logout = (req, res) => {
  const sid = req.cookies[cookieKey]
  if (!sid) {
    if (req.isAuthenticated) {
      req.logout()
      return res.sendStatus(200)
    }
    return res.sendStatus(401)
  }
  redis.del(sid)
  res.clearCookie(cookieKey)
  return res.sendStatus(200)
}

const status = (req, res) => {
  return res.send({status : req.scope})
}

const isLoggedIn = (req, res, next) => {

  const sid = req.cookies[cookieKey]

  req.scope = req.cookies["scope"]

  if (!sid) {
    if (req.isAuthenticated()) {
      req.scope = req.cookies["scope"]
      req.username = req.user[0].username
      return next()
    } else {
      return res.sendStatus(401)
    }

  }

  redis.hgetall(sid, function(err, userObj) {
    if (userObj) {
      req.username = userObj.username
      return next()
    } else {
      return res.sendStatus(401)
    }
  })
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

const fail = (req, res) => {
  return res.send("failed")
}

const hello = (req, res) => res.send({ hello: 'world' })

module.exports = app => {
     app.use(cookieParser())
     app.use(session({ secret: 'yFSF_bF_Gx4eknhHZdqCaWni' }))
     app.use(passport.initialize())
     app.use(passport.session())
     app.use('/oauth/google', passport.authenticate('google', { scope: 'email'}))
     app.use('/callback', passport.authenticate('google', {
         successRedirect: '/oauthLogin', failureRedirect : '/fail' }))
     app.post('/register', register)
     app.post('/login', login)
     app.use('/oauthLogin', oauthLogin)
     app.post('/oauth/link', isLoggedIn, link)
     app.put('/oauth/unlink', isLoggedIn, unlink)
     app.put('/logout', isLoggedIn, logout)
     app.put('/password', isLoggedIn, changePwd)
     app.get('/status', isLoggedIn, status)
     app.use(isLoggedIn)
}
