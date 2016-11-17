'use strict'

const uploadImage = require('../uploadCloudinary.js')

const profile = {
	username: 'qh5',
	headline: 'Become a web developer!',
	email: 'your@email.com',
	zipcode: 77005,
	avatar: 'a.jpg',
	dob: 912736182743912837
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : 
					[profile.username]
	let headlines
	if (users.length == 1 && users[0] == profile.username) {
		headlines = [ { username: profile.username, 
			headline : profile.headline } ]
	} else {
		const defaultHeadline = "Hello world!"
		headlines = users.map((user) => ({ "username" : user, "headline" : defaultHeadline }))
	}
	res.send({ headlines : headlines })
}

const putHeadline = (req, res) => {
	if (req.body.headline) {
		profile.headline = req.body.headline
	}
	res.send({ username: profile.username, 
			   headline: req.body.headline || profile.headline})
}

const getEmail = (req, res) => {
	let email
	if (req.params.user) {
		email = "default@email.com"
	} else {
		email = profile.email
	}
	res.send({ username: req.params.user || profile.username, 
			   email: email})
}

const putEmail = (req, res) => {
	if (req.body.email) {
		profile.email = req.body.email
	}
	res.send({ username: profile.username, 
			   email: req.body.email || profile.email})
}

const getZipcode = (req, res) => {
	let zipcode
	if (req.params.user) {
		zipcode = 77054
	} else {
		zipcode = profile.zipcode
	}
	res.send({ username: req.params.user || profile.username, 
			   zipcode: zipcode})
}

const putZipcode = (req, res) => {
	if (req.body.zipcode) {
		profile.zipcode = req.body.zipcode
	}
	res.send({ username: profile.username, 
			   zipcode: req.body.zipcode || profile.zipcode})
}

const getDob = (req, res) => {
	res.send({ username: profile.username, dob: profile.dob })
}

const getAvatars = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : 
					[profile.username]
	let avatars
	if (users.length == 1 && users[0] == profile.username) {
		avatars = [ { username: profile.username, 
			avatar : profile.avatar } ]
	} else {
		const defaultAvatar = "b.jpg"
		avatars = users.map((user) => 
			({ username : user, avatar : defaultAvatar }))
	}

	res.send({ avatars : avatars })
}

const putAvatar = (req, res) => {
	// res.send({ username : profile.username, avatar : 'c.jpg' })
	profile.avatar = req.fileurl;
	res.send({ username : profile.username, avatar : req.fileurl })
}

module.exports = app => {
	app.get('/', index)
    app.get('/headlines/:users?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', putZipcode)
    app.get('/dob', getDob)
    app.get('/avatars/:users?', getAvatars)
    app.put('/avatar', uploadImage('avatar'), putAvatar)
}
