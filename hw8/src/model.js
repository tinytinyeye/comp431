// this is model.js
'use strict'

const mongoose = require('mongoose')
require('./db.js')

const commentSchema = new mongoose.Schema({
	commentId: String, author: String, date: Date, text: String
})

const articleSchema = new mongoose.Schema({
	author: String, text: String, date: Date, img: String,
	comments: [ commentSchema ]
})

const userSchema = new mongoose.Schema({
	username: String, salt: String, hash: String, oauth: String
})

const profileSchema = new mongoose.Schema({
	username: String, headline: String, following: [ String ], email: String,
	zipcode: String, avatar: String, dob: Date
})

exports.Article = mongoose.model('posts', articleSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)
exports.Comment = mongoose.model('comments', commentSchema)
