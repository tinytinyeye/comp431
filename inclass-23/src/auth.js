'use strict'

// require('./src/auth')(app)
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = {clientID: '766959140000-nmfhddicf9tm5kktr4o7o9tugsbbkv20.apps.googleusercontent.com',
				clientSecret: 'yFSF_bF_Gx4eknhHZdqCaWni',
				callbackURL: "http://localhost:4000/callback"}

passport.serializeUser(function(user, done) {
      done(null, "qh5")
})

passport.deserializeUser(function(id, done) {
	done(null, "qh5")
})

passport.use(new GoogleStrategy(config,
	function(accessToken, refreshToken, profile, cb) {
	 	console.log("inside google strategy")
	 	return cb("", "qh5")
	}
))

function login(req, res) {
    let user = req.body.username ? req.body.username : username
    res.send({ result: "success", username : user })
}

function logout(req, res) {
    req.logout()
    res.redirect('/')
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

function fail(req, res) {
    res.send({ status : "fail"})
}

function profile(req, res) {
    res.send('ok now what?')
}

function hello(req, res) {
    console.log('hello world!')
}

module.exports = app => {
    app.use(session({ secret: 'yFSF_bF_Gx4eknhHZdqCaWni' }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(cookieParser())
    app.use('/oauth/google', passport.authenticate('google', { scope: 'email'}))
    app.use('/callback', passport.authenticate('google', {
        successRedirect: '/profile', failureRedirect : '/fail' }))
    app.use('/profile', profile)
    app.use('/fail', fail)
    app.use('/logout', logout)
    app.use('/', hello)
}
