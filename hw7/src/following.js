'use strict'

const Profile = require('./model.js').Profile;

const getUser = (username, callback) => {
     Profile.find({ username: username }).exec((err, user) => {
          if (user.length) {
              callback(user[0])
          } else {
              callback(null)
          }
     })
}

const getFollowers = (req, res) => {
    const username = req.params.user ? req.params.user : req.username
  	getUser(username, (user) => {
  		if (!user) {
  			res.sendStatus(500)
  		} else {
  			const following = user.following
  			res.send({ username, following })
  		}
  	})
}

const addFollower = (req, res) => {
    const newFollower = req.params.user
    const username = req.username
    // Check if the new follower is valid
    getUser(newFollower, (follower) => {
      if (follower) {
        getUser(username, (user) => {
            let following = user.following
            if (!following.includes(newFollower) && newFollower != username) {
                following[following.length] = newFollower
            }
      			user.following = following
      			Profile.findOneAndUpdate({ username : username }, user, { upsert:false },
      		    (err, profile) => {
      		      return res.send({ username, following })
      		    })
      	})
      } else {
        getUser(username, (user) => {
            let following = user.following
            return res.send({ username, following })
      	})
      }
    })
}

const deleteFollower = (req, res) => {
    const removeFollower = req.params.user
    const username = req.username
    getUser(username, (user) => {
      let following = user.following
      following = following.filter((f) => f != removeFollower)
      user.following = following
      Profile.findOneAndUpdate({ username : username }, user, { upsert:false },
        (err, profile) => {
          return res.send({ username, following })
        })
    })
}

module.exports = app => {
     app.get('/following/:user?', getFollowers)
     app.put('/following/:user', addFollower)
     app.delete('/following/:user', deleteFollower)
}
