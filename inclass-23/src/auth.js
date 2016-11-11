'use strict'

// require('./src/auth')(app)
const passport = require('passport')

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
    app.use('/login', passport.authenticate('google', { scope: 'email'}))
    app.use('/callback', passport.authenticate('google', {
        successRedirect: '/profile', failureRedirect : '/fail' }))
    app.use('/profile', profile)
    app.use('/fail', fail)
    app.use('/logout', logout)
    app.use('/', hello)
}