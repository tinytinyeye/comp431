'use strict'

let following = ["qh5", "sep1", "grader"]

const defaultFollowing = ["test"]

const getFollowers = (req, res) => {
     let follower
     if (req.params.user) {
          follower = defaultFollowing
     } else {
          follower = following
     }
     res.send({"username" : req.params.user || 'qh5',
               "following" : following})
}

const addFollower = (req, res) => {
     following.push(req.params.user)
     res.send({"username" : 'qh5', 
               "following" : following})
}

const deleteFollower = (req, res) => {
     following = following.filter((user) => user != req.params.user)
     res.send({"username" : 'qh5', 
               "following" : following})
}

module.exports = app => {
     app.get('/following/:user?', getFollowers)
     app.put('/following/:user', addFollower)
     app.delete('/following/:user', deleteFollower)
}