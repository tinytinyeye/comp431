'use strict'

let users = {}

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const request = require('request')
// const qs = require('querystring')
const session = require('express-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = {clientID: '766959140000-nmfhddicf9tm5kktr4o7o9tugsbbkv20.apps.googleusercontent.com',
				clientSecret: 'yFSF_bF_Gx4eknhHZdqCaWni',
				callbackURL: "http://localhost:3000/callback"}

const app = express()

app.use(bodyParser.json())
app.use(session({ secret: 'yFSF_bF_Gx4eknhHZdqCaWni' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())


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

require('./src/auth')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
