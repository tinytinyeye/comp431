import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import { shallow } from 'enzyme'
import {expect} from 'chai'
import { ArticlesView } from './articlesView'
import { NewArticle } from './NewArticle'

describe('article view', () => {

	it('should render articles', () => {
		let articles = { 1 : {
			_id: 1, avatar: 'a.jpg', img: 'a.jpg', author: 'qh5',
			date: "2015-08-24T17:26:03.621Z", text: "abc", 
			comments: [ { commentId: 1, author: 'qh5', 
			date: "2015-08-24T17:26:03.621Z", text: 'abc'} ]
			}, 2: {
			_id: 2, avatar: 'a.jpg', img: 'a.jpg', author: 'qh5',
			date: "2015-08-24T17:26:03.621Z", text: "abc", 
			comments: [ { commentId: 1, author: 'qh5', 
			date: "2015-08-24T17:26:03.621Z", text: 'abc'} ]
			}
		}
		let avatars = { 'qh5' : 'a.jpg' }
		
		const node = shallow(<ArticlesView articles={articles} 
							avatars={avatars} keyword=""/>)
		expect(node.children().length).to.equal(4)
	})

	it('should dispatch actions to create new article', () => {
		let added = false
		const node = TestUtils.renderIntoDocument(<div>
				<NewArticle addArticle={() => {added = true}}/>
			</div>)
		let element = findDOMNode(node).children[0].children[1]
		.children[1].children[0].children[0]
		TestUtils.Simulate.click(element);
		expect(added).to.equal(true);
	})

})