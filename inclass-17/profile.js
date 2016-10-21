
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	res.send({ headlines: [
			 { username: req.params.user || 'qh5', headline: "Great"}
		]})
}

const putHeadline = (req, res) => {
	res.send({ username: 'qh5', headline: req.body.headline || "Awesome"})
}

const getEmail = (req, res) => {
	res.send({ username: req.params.user || 'qh5', email: 'qh5@rice.edu'})
}

const putEmail = (req, res) => {
	res.send({ username: 'qh5', email: req.body.email || 'qh5@rice.edu'})
}

const getZipcode = (req, res) => {
	res.send({ username: req.params.user || 'qh5', zipcode: '77005'})
}

const putZipcode = (req, res) => {
	res.send({ username: 'qh5', zipcode: req.body.zipcode || '77005'})
}

const getAvatars = (req, res) => {
	res.send({ avatars: [{ username: req.params.user || 'qh5', avatar: 'localhost:3000/a.jpg'}]})
}

const putAvatar = (req, res) => {
	res.send({ username: 'qh5', avatar: req.body.avatar || 'localhost:3000/a.jpg'})
}

module.exports = app => {
	app.get('/', index)
    app.get('/headlines/:user?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', putZipcode)
    app.get('/avatars/:user?', getAvatars)
    app.put('/avatar', putAvatar)
}
