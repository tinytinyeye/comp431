'use strict'

const Profile = require('./model.js').Profile

// Get the profile info of a user by username
const getUser = (username, callback) => {
     Profile.find({ username: username }).exec((err, user) => {
          if (user.length) {
              callback(user[0])
          } else {
              callback(null)
          }
     })
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

// Get all the headlines from the provided user list
const getHeadlines = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : req.username
	Profile.find()
				 .where('username').in(users)
				 .exec((err, profiles) => {
					 const headlines = profiles.map((p) =>
						 ({ username : p.username, headline : p.headline })
					 )
					 res.send({ headlines })
				 })
}

// Find the current user and change headline
const putHeadline = (req, res) => {
	const username = req.username
	const headline = req.body.headline
	getUser(username, (user) => {
			user.headline = headline
			Profile.findOneAndUpdate({ username : username }, user, { upsert:false },
		    (err, profile) => {
		      res.send({ username, headline })
		    })
	})
}

// Find the email of given user
const getEmail = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	getUser(username, (user) => {
		if (!user) {
			res.sendStatus(500)
		} else {
			const email = user.email
			res.send({ username, email })
		}
	})
}

// Change the email of given user
const putEmail = (req, res) => {
	const username = req.username
	const email = req.body.email
	getUser(username, (user) => {
			user.email = email
			Profile.findOneAndUpdate({ username : username }, user, { upsert:false },
		    (err, profile) => {
		      res.send({ username, email })
		    })
	})
}

// Get the zipcode of current user
const getZipcode = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	getUser(username, (user) => {
		if (!user) {
			res.sendStatus(500)
		} else {
			const zipcode = user.zipcode
			res.send({ username, zipcode })
		}
	})
}

// Change the zipcode of current user
const putZipcode = (req, res) => {
	const username = req.username
	const zipcode = req.body.zipcode
	getUser(username, (user) => {
			user.zipcode = zipcode
			Profile.findOneAndUpdate({ username : username }, user, { upsert:false },
		    (err, profile) => {
		      res.send({ username, zipcode })
		    })
	})
}

// Get the date of birth of current user
const getDob = (req, res) => {
	const username = req.username
	getUser(username, (user) => {
			const dob = user.dob
			res.send({ username, dob })
	})
}

// Get all the avatars from the provided userlist
const getAvatars = (req, res) => {
	const users = req.params.users ? req.params.users.split(',') : req.username
	Profile.find()
				 .where('username').in(users)
				 .exec((err, profiles) => {
					 const avatars = profiles.map((p) =>
						 ({ username : p.username, avatar : p.avatar })
					 )
					 res.send({ avatars })
				 })
}

// Update an avatar, just a stub now.
const putAvatar = (req, res) => {
	res.send({ username : profile.username, avatar : 'c.jpg' })
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
		app.put('/avatar', putAvatar)
}
