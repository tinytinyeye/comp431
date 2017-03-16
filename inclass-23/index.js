'use strict'

let users = {}

const express = require('express')
const bodyParser = require('body-parser')

// const request = require('request')
// const qs = require('querystring')

const app = express()

const cors = (req, res, next) => {
  if (req.headers.origin) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
  }
	res.setHeader("Access-Control-Allow-Credentials", true)
	res.setHeader('Access-Control-Allow-Methods', "GET, PUT, DELETE, POST")
	res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, X-Session-Id")
	if (req.method == "OPTIONS") {
		return res.sendStatus(200)
	}
	next()
}

app.use(cors)

app.use(bodyParser.json())

require('./src/auth')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
