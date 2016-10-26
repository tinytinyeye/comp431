import {expect} from 'chai'
import fetch, { mock } from 'mock-fetch'
import mockery from 'mockery'

// import * as actions from './actions'
import { navToLanding, navToProfile, navToMain, 
	updateSuccessMsg, updateErrorMsg } from './actions'

describe('nav actions', () => {

	it('should navigate to landing', () => {
		const expectedAction = { type: 'LANDING' }
		expect(navToLanding()).to.deep.equal(expectedAction)
	})

	it('should navigate to profile', () => {
		const expectedAction = {type: 'PROFILE'}
		expect(navToProfile()).to.deep.equal(expectedAction)
	})

	it('should navigate to main', () => {
		const expectedAction = {type: 'MAIN'}
		expect(navToMain()).to.deep.equal(expectedAction)
	})

})

describe('message update actions', () => {

	it('should update success message', () => {
		const text = "success!"
		const expectedAction = { type : 'SUCCESS', successMsg : "success!"}
		expect(updateSuccessMsg(text)).to.deep.equal(expectedAction)
	})

	it('should update error message', () => {
		const text = "error!"
		const expectedAction = { type : 'ERROR', errorMsg : "error!"}
		expect(updateErrorMsg(text)).to.deep.equal(expectedAction)
	})

})

let resource, url
describe('fetch resource', () => {

	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			resource = require('./actions').resource
  			url = require('./actions').url
  		}
	})

	afterEach(() => {
	 	if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

	it('should fetch a resource', (done) => {
		mock(`${url}/headline`, {
			headers: {'Content-Type': 'application/json'},
			json: {
				username: 'hi',
				headlines: {username: 'hi', headline:'ok'}
			}
		})

		const expected = { 
				username: 'hi',
				headlines: {username: 'hi', headline:'ok'}
			}
		resource('GET', 'headline')
			.then(r => expect(r).to.deep.equal(expected))
			.then(done())
	})

	it('should not fetch a resource', (done) => {
		mock(`${url}/headline`, {
			headers: {'Content-Type': 'text/plain'},
			status: 401
		})

		resource('GET', 'headline')
			.then(r => expect(r).to.equal("401 error occurs."))
			.then(done())
	})

	it('should post a resource', (done) => {
		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {
				status: "success"
			}
		})

		let username = "username"
		let password = "password"
		const expected = { status: "success" }
		
		resource('POST', 'login', { username, password })
			.then(r => expect(r).to.deep.equal(expected))
			.then(done())
	})

})
