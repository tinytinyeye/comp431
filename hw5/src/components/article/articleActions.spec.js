import {expect} from 'chai'
import fetch, { mock } from 'mock-fetch'
import mockery from 'mockery'
import { updateArticles, updateAvatars, updateKeyword, addArticle,
		 parseDate, sortByDate, filterByKeyword } from './articleActions'


let fetchArticles, fetchAvatars, url
describe('Fetch articles', () => {

	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			fetchArticles = require('./articleActions').fetchArticles
			fetchAvatars = require('./articleActions').fetchAvatars
  			url = require('../../actions').url
  		}
	})

	afterEach(() => {
	 	if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

	it('should fetch articles', (done) => {
		mock(`${url}/articles`, { 
			headers: {'Content-Type': 'application/json'},
			json: { articles: [ {_id: 1, payload: ""} ] }
		})

		const expected = { 1 : {_id: 1, payload: ""} }

		fetchArticles()(action => {
			expect(action.type).to.equal("UPDATE_ARTICLES")
			expect(action.articles).to.deep.equal(expected)
		})
		done()
	})

	it('should fetch avatars', (done) => {
		mock(`${url}/following`, { 
			headers: {'Content-Type': 'application/json'},
			json: { following : [ 'sep1' ] }
		})

		mock(`${url}/avatars/sep1`, { 
			headers: {'Content-Type': 'application/json'},
			json: { avatars : [ { username: 'sep1', avatar: 'b.jpg'} ] }
		})

		mock(`${url}/avatars`, {
			headers: {'Content-Type': 'application/json'},
			json: { avatars : [ { username: 'qh5', avatar: 'a.jpg'} ] }
		})

		const expected = { sep1: 'b.jpg', qh5: 'a.jpg' }

		fetchAvatars()(action => {
			expect(action.type).to.equal("UPDATE_AVATARS")
			expect(action.avatars).to.deep.equal(expected)
		})
		done()
	})

})

describe('Update articles', () => {

	it('should update articles', () => {
		const articles = { 1 : {_id: 1, payload: ""} }
		const expectedAction = { type: 'UPDATE_ARTICLES', articles}
		expect(updateArticles(articles)).to.deep.equal(expectedAction)
	})

	it('should update avatars', () => {
		const avatars = { qh5 : "a.jpg" }
		const expectedAction = { type: 'UPDATE_AVATARS', avatars}
		expect(updateAvatars(avatars)).to.deep.equal(expectedAction)
	})

	it('should update keyword', () => {
		const keyword = "hello"
		const expectedAction = { type: 'UPDATE_KEYWORD', keyword}
		expect(updateKeyword(keyword)).to.deep.equal(expectedAction)
	})

	it('should add article', () => {
		const article = { text: "abc" }
		const expectedAction = { type: 'ADD_ARTICLE', article}
		expect(addArticle(article)).to.deep.equal(expectedAction)
	})

})

describe('Article util functions', () => {

	it('should parse date', () => {
		let date = "2015-08-24T17:26:03.621Z"
		let expected = "on 2015-08-24 at 17:26:03"
		expect(parseDate(date)).to.equal(expected)
	})

	it('should sort articles by date', () => {
		let article1 = { date: "2015-08-24T17:26:03.621Z" }
		let article2 = { date: "2015-08-02T17:00:47.877Z" }
		expect(sortByDate(article1, article2)).to.equal(-1)
		expect(sortByDate(article2, article1)).to.equal(1)
		let article3 = { date: "2015-08-24T17:26:03.621Z" }
		let article4 = { date: "2015-08-24T17:00:47.877Z" }
		expect(sortByDate(article3, article4)).to.equal(-1)
		expect(sortByDate(article4, article3)).to.equal(1)
	})

	it('should filter articles by keyword', () => {
		let article = { author: "qh5", text: "aksjhd kajshdkajsh gs",
						_id : 1, date : "2015-08-24T17:00:47.877Z" }
		expect(filterByKeyword(article, "qh5")).to.be.true
		expect(filterByKeyword(article, "sep1")).to.be.false
		expect(filterByKeyword(article, "aks")).to.be.true
		expect(filterByKeyword(article, "gq")).to.be.false
		// filter will not search for fields other than author and body
		expect(filterByKeyword(article, "2015")).to.be.false
		expect(filterByKeyword(article, "1")).to.be.false
	})

})