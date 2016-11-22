'use strict'

const Profile = require('./model.js').Profile

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

const getDob = (req, res) => {
	const username = req.username
	getUser(username, (user) => {
			const dob = user.dob
			res.send({ username, dob })
	})
}

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
