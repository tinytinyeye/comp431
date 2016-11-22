/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `https://comp431-backend.herokuapp.com/${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.articles.length > 3).to.be.true
		}).then(done())
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		const payload = { body: "Hello world!" }
		const payload2 = { body: "world Hello!" }
		const options = {
        	  method: 'POST',
        	  credentials: 'include',
        	  headers: {'Content-Type': 'application/json'}
		}
		const options2 = {
        	  method: 'POST',
        	  credentials: 'include',
        	  headers: {'Content-Type': 'application/json'}
		}
		let prevId
  		options.body = JSON.stringify(payload)
		fetch(url("/article"), options)
			.then(res => {
				expect(res.id).to.exist
				expect(res.body).to.equal("Hello world!")
				prevId = res.id
			})
			.then(fetch(url("/article"), options)
				.then(res => {
					expect(res.id).to.equal(prevId + 1)
					expect(res.body).to.equal("world Hello")
				}))
			.then(done())
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		let id
		fetch(url("/articles"))
			.then(res => {
				id = Math.floor((Math.random() * res.articles.length) + 1);
			})
			.then(fetch(url("/articles/{id}"))
				.then(res => expect(res.articles.length).to.equal(1)))
				.then(done())
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
			.then(res => {
				expect(res.articles.length).to.equal(0)
			})
			.then(done())
	}, 200)

});
