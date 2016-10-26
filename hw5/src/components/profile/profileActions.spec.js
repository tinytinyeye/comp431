import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import mockery from 'mockery'
import { updateName, updateAvatar, updateZipcode,
		updateEmail, updateBirthday, updateHeadline,
		updatePassword } from './profileActions'

describe('profile update actions', () => {

	it('should update name', () => {
		const expectedAction = { type: 'UPDATE_NAME' , name: "abc" }
		expect(updateName("abc")).to.deep.equal(expectedAction)
	})

	it('should update avatar', () => {
		const expectedAction = { type: 'UPDATE_AVATAR' , avatar: "a.jpg" }
		expect(updateAvatar("a.jpg")).to.deep.equal(expectedAction)
	})

	it('should update zipcode', () => {
		const expectedAction = { type: 'UPDATE_ZIPCODE' , zipcode: "12345" }
		expect(updateZipcode("12345")).to.deep.equal(expectedAction)
	})

	it('should update email', () => {
		const expectedAction = { type: 'UPDATE_EMAIL' , email: "a@b.com" }
		expect(updateEmail("a@b.com")).to.deep.equal(expectedAction)
	})

	it('should update birthday', () => {
		const expectedAction = { type: 'UPDATE_BIRTHDAY', 
		birthday: "12-12-1995" }
		expect(updateBirthday("12-12-1995")).to.deep.equal(expectedAction)
	})

	it('should update headline', () => {
		const expectedAction = { type: 'UPDATE_HEADLINE', headline: "awesome" }
		expect(updateHeadline("awesome")).to.deep.equal(expectedAction)
	})

	it('should update password', () => {
		const expectedAction = { type: 'UPDATE_PASSWORD', 
		password: "123" }
		expect(updatePassword("123")).to.deep.equal(expectedAction)
	})

 })

let fetchProfile, fetchField, url
describe('fetch profile info', () => {

	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			fetchProfile = require('./profileActions').fetchProfile
			fetchField = require('./profileActions').fetchField
  			url = require('../../actions').url
  		}
	})

	afterEach(() => {
	 	if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

	it('should fetch profile info', () => {
		mock(`${url}/avatars`, { 
			headers: {'Content-Type': 'application/json'},
			json: { avatars : [ { username: 'qh5', avatar: 'a.jpg'} ] }
		})

		fetchField('avatars')(action => {
			expect(action.avatar).to.equal("a.jpg")
		})

		mock(`${url}/avatars`, { 
			headers: {'Content-Type': 'application/json'},
			json: { avatars : [ { username: 'qh5', avatar: 'a.jpg'} ] }
		})

		mock(`${url}/headlines`, { 
			headers: {'Content-Type': 'application/json'},
			json: { headlines : [ { username: 'qh5', headline: 'hello'} ] }
		})

		mock(`${url}/email`, { 
			headers: {'Content-Type': 'application/json'},
			json: { username: 'qh5', email: 'a@b.com'}
		})

		mock(`${url}/zipcode`, { 
			headers: {'Content-Type': 'application/json'},
			json: { username: 'qh5', zipcode: '77005'}
		})

		mock(`${url}/dob`, { 
			headers: {'Content-Type': 'application/json'},
			json: { username: 'qh5', dob: '12345'}
		})		

		fetchProfile()(action => {
			switch (action.type) {
				case "UPDATE_AVATAR":
					expect(action.avatar).to.equal('a.jpg')
					break;
				case "UPDATE_HEADLINE":
					expect(action.headline).to.equal('hello')
					break;
				case "UPDATE_EMAIL":
					expect(action.email).to.equal('a@b.com')
					break;
				case "UPDATE_ZIPCODE":
					expect(action.zipcode).to.equal('77005')
					break;
				case "UPDATE_BIRTHDAY":
					expect(action.dob).to.equal('12345')
					break;
				case "UPDATE_NAME":
					expect(action.name).to.equal('qh5')
					break;
			}
		})
	})

})

