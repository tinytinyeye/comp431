import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import mockery from 'mockery'
import { updateFollowers } from './followingActions'

let fetchFollowers, url
describe('Fetch followers', () => {

	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			fetchFollowers = require('./followingActions').fetchFollowers
  			url = require('../../actions').url
  		}
	})

	afterEach(() => {
	 	if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

	it('should fetch followers', (done) => {
		mock(`${url}/following`, { 
			headers: {'Content-Type': 'application/json'},
			json: { following : [ 'qh5' ] }
		})

		const expected = { qh5: { name: 'qh5', avatar: 'a.jpg', 
				headline: "hi"} }

		mock(`${url}/headlines/qh5`, { 
			headers: {'Content-Type': 'application/json'},
			json: { headlines : [ { username: 'qh5', headline: 'hi'} ] }
		})

		mock(`${url}/avatars/qh5`, { 
			headers: {'Content-Type': 'application/json'},
			json: { avatars : [ { username: 'qh5', avatar: 'a.jpg'} ] }
		})

		fetchFollowers()(action => {
			expect(action.type).to.equal("UPDATE_FOLLOWERS")
			expect(action.followers).to.deep.equal(expected)
		})
		done()
	})

})

describe('Update followers', () => {
	it('should update followers', () => {
		const payload = { qh5: { name: 'qh5', avatar: 'a.jpg', 
				headline: "hi"} }
		const expected = { type: 'UPDATE_FOLLOWERS', followers: payload}
		expect(updateFollowers(payload)).to.deep.equal(expected)
	})
})