import {expect} from 'chai'
import fetch, { mock } from 'mock-fetch'
import mockery from 'mockery'

import { validEmail, validZipcode, confirmPassword, validate } 
		from './authActions'

describe('Validate register infomation', () => {

	it('should be valid email', () => {
		expect(validEmail("a")).to.equal(null)
		expect(validEmail("a@b")).to.equal(null)
		expect(validEmail("a@b.com")).to.not.equal(null)
	})

	it('should be valid zipcode', () => {
		expect(validZipcode("77005")).to.not.equal(null)
		expect(validZipcode("12345")).to.not.equal(null)
		expect(validZipcode("123")).to.equal(null)
		expect(validZipcode("a12")).to.equal(null)
	})

	it('should have same password and password confirm', () => {
		expect(confirmPassword("123", "321")).to.be.false
		expect(confirmPassword("123", "123")).to.be.true
	})

})

let login, logout, url, Reducer
describe('Login and logout', () => {

	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			login = require('./authActions').login
  			logout = require('./authActions').logout
  			url = require('../../actions').url
  			Reducer = require('../../reducers').default
  		}
	})

	afterEach(() => {
	 	if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

	it('should log user in', (done) => {
		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {
				status: "success"
			}
		})

		mock(`${url}/avatars`, { 
			headers: {'Content-Type': 'application/json'},
			json: {
				status: "success"
			}
		})

		let username = "username"
		let password = "password"
		login(username, password)(action => {
			console.log(action.type)
			expect(action.type).to.equal("MAIN")
		})
		done()
	})

	it('should not log user in', (done) => {
		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			status: 401
		})

		let username = "username"
		let password = "password"
		login(username, password)(action => {
			expect(action.errorMsg).to.equal("Invalid username or password")
		})
		done()
	})

	it('should log user out', (done) => {
		mock(`${url}/logout`, { 
			method: 'PUT',
			headers: {'Content-Type': 'text/plain'},
		})

		logout()(action => {
			expect(action.type).to.equal("CLEAR_ARTICLES")
		})
		done()
	})

})
