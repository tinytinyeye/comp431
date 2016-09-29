import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		// findDOMNode and assert 3 children of the ToDoItem element
		// assert the className is ''
		// assert the innerHTML of the todo is the text you initially set
		const node =  TestUtils.renderIntoDocument(<div>
				<ToDoItem text="todo" done={false} toggle={() => {}} remove={() => {}}/>
			</div>)
		const element = findDOMNode(node).children[0]
		expect(element.children.length).to.equal(3)
		expect(element.children[1].className).to.equal('')
		expect(element.children[1].innerHTML).to.equal('todo')
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		// when the checkbox is clicked via TestUtils.Simulate.click()
		// we expect the variable toggled to be true
		const node =  TestUtils.renderIntoDocument(<div>
				<ToDoItem text="todo" done={false} toggle={() => { toggled = true }} remove={() => {}}/>
			</div>)
		expect(toggled).to.equal(false);
		const element = findDOMNode(node).children[0];
		TestUtils.Simulate.click(element.children[0]);
		expect(toggled).to.equal(true);
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
		const node =  TestUtils.renderIntoDocument(<div>
				<ToDoItem text="todo" done={false} toggle={() => {}} remove={() => { removed = true }}/>
			</div>)
		expect(removed).to.equal(false);
		const element = findDOMNode(node).children[0];
		TestUtils.Simulate.click(element.children[2]);
		expect(removed).to.equal(true);
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		// assert that the rendered className is "completed"
		const node =  TestUtils.renderIntoDocument(<div>
				<ToDoItem text="todo" done={true} toggle={() => {}} remove={() => {}}/>
			</div>)
		const element = findDOMNode(node).children[0];
		expect(element.children[1].className).to.equal('completed');
	})

})
