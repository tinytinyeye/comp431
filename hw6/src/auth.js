'use strict'

const username = 'qh5'

const register = (req, res) => {
	let user = req.body.username ? req.body.username : username
    res.send({ result: 'success', username: user })
}

const login = (req, res) => {
	let user = req.body.username ? req.body.username : username
     res.send({ result: "success", username : user })
}

const logout = (req, res) => {
     res.send("OK")
}

const changePassword = (req, res) => {
     res.send({ username : username, status : 'will not change' })
}

module.exports = app => {
     app.post('/register', register)
     app.post('/login', login)
     app.put('/logout', logout)
     app.put('/password', changePassword)
}