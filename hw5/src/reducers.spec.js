import {expect} from 'chai'
import Reducer from './reducers'
import { profile, route, status, following, articles } from './reducers'

describe('initialize state', () => {

	it('should initialize state', () => {
		const expected = { 
			profile: { name: '', email: '', zipcode: '', avatar: '', 
					   headline: '', birthday: '', password: '' },
  			route: { location: 'landing' },
  			status: { errorMsg: '', successMsg: '' },
  			following: { followers: {} },
  			articles: { articles: {}, avatars: {}, keyword: '' } 
  		}
		expect(Reducer({}, {})).to.deep.equal(expected)
	})

})

describe('Page navigation', () => {

	it('should handle navigation to landing', () => {
		const expected = {
			location : 'landing'
		}
		const action = { type: 'LANDING' }
		expect(route({ location: 'main' }, action)).to.deep.equal(expected)
	})

	it('should handle navigation to main', () => {
		const expected = {
			location : 'main'
		}
		const action = { type: 'MAIN' }
		expect(route({ location: 'landing' }, action)).to.deep.equal(expected)
	})

	it('should handle navigation to profile', () => {
		const expected = {
			location : 'profile'
		}
		const action = { type: 'PROFILE' }
		expect(route({ location: 'main' }, action)).to.deep.equal(expected)
	})

})

describe('Message update', () => {

	const before = { successMsg: '', errorMsg: '' }

	it('should handle success message update', () => {
		const expected = {
			successMsg : 'Successful!',
			errorMsg : ''
		}
		const action = { type: 'SUCCESS' , successMsg: 'Successful!'}
		expect(status(before, action)).to.deep.equal(expected)
	})

	it('should handle error message update', () => {
		const expected = {
			successMsg : '',
			errorMsg : 'Error!'
		}
		const action = { type: 'ERROR' , errorMsg: 'Error!'}
		expect(status(before, action)).to.deep.equal(expected)
	})

})

describe('Profile update', () => {

	const before = { 
			name: '', email: '', zipcode: '', avatar: '', 
			headline: '', birthday: '', password: '' 
	}

	it('should handle name update', () => {
		const action = { type: "UPDATE_NAME", name: "name" }
		const expected = { 
			name: 'name', email: '', zipcode: '', avatar: '', 
			headline: '', birthday: '', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle email update', () => {
		const action = { type: "UPDATE_EMAIL", email: "email" }
		const expected = { 
			name: '', email: 'email', zipcode: '', avatar: '', 
			headline: '', birthday: '', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle zipcode update', () => {
		const action = { type: "UPDATE_ZIPCODE", zipcode: "12345" }
		const expected = { 
			name: '', email: '', zipcode: '12345', avatar: '', 
			headline: '', birthday: '', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle avatar update', () => {
		const action = { type: "UPDATE_AVATAR", avatar: "avatar" }
		const expected = { 
			name: '', email: '', zipcode: '', avatar: 'avatar', 
			headline: '', birthday: '', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle headline update', () => {
		const action = { type: "UPDATE_HEADLINE", headline: "headline" }
		const expected = { 
			name: '', email: '', zipcode: '', avatar: '', 
			headline: 'headline', birthday: '', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle birthday update', () => {
		const action = { type: "UPDATE_BIRTHDAY", birthday: "1029371926817" }
		const expected = { 
			name: '', email: '', zipcode: '', avatar: '', 
			headline: '', birthday: '1029371926817', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle headline update', () => {
		const action = { type: "UPDATE_HEADLINE", headline: "headline" }
		const expected = { 
			name: '', email: '', zipcode: '', avatar: '', 
			headline: 'headline', birthday: '', password: '' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

	it('should handle password update', () => {
		const action = { type: "UPDATE_PASSWORD", password: "password" }
		const expected = { 
			name: '', email: '', zipcode: '', avatar: '', 
			headline: '', birthday: '', password: 'password' 
		}
		expect(profile(before, action)).to.deep.equal(expected)
	})

})

describe('Following update', () => {
	it('should handle follower update', () => {
		const before = { followers : {} }
		const action = { type: 'UPDATE_FOLLOWERS', 
				followers: {"username":"qh5","following":["qh5test","sep1"]}}
		const expected = {
			followers: {"username":"qh5","following":["qh5test","sep1"]}
		}
		expect(following(before, action)).to.deep.equal(expected)
	})
})

describe('Article update', () => {
	it('should handle articles update', () => {
		const before = { articles: {} }
		const action = { type: 'UPDATE_ARTICLES', articles: {
			1 : {_id: 1, text: 'abc', date: '12-12-2012', img: 'a.jpg', 
			author: 'a', comments: [ { commentId: 1, author: 'b', 
			date: '12-12-2012', text: 'cba' } ]}}
		}
		const expected = {
			articles: {
				1 : {_id: 1, text: 'abc', date: '12-12-2012', img: 'a.jpg', 
				author: 'a', comments: [ { commentId: 1, author: 'b', 
				date: '12-12-2012', text: 'cba' } ]}
			}
		}
		expect(articles(before, action)).to.deep.equal(expected)
	})

	it('should handle avatars update', () => {
		const before = { avatars: {} }
		const action = { type: 'UPDATE_AVATARS', avatars: {sa23 : "a.jpg"}}
		const expected = {
			avatars: {sa23 : "a.jpg"}
		}
		expect(articles(before, action)).to.deep.equal(expected)
	})

	it('should handle keyword update', () => {
		const before = { keyword : "" }
		const action = { type: 'UPDATE_KEYWORD', keyword: "abc" }
		const expected = {
			keyword: "abc"
		}
		expect(articles(before, action)).to.deep.equal(expected)
	})
})

