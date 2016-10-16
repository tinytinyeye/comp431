import { combineReducers } from 'redux'
import Action from './actions'

function status(state = { errorMsg: '', successMsg: '' }, action) {
	switch (action.type) {
		case Action.SUCCESS:
			return { errorMsg: '', successMsg: action.success }
		case Action.ERROR:
			return { errorMsg: action.error, successMsg: ''}
		default:
			return {errorMsg: '', successMsg: ''};
	}
	
}

function route(state = { location: 'landing' }, action) {
	switch (action.type) {
		case Action.NAV_PROFILE:
			return { location: 'profile'}
		case Action.NAV_MAIN:
			return { location: 'main'}
		case Action.NAV_LANDING:
			return { location: 'landing'}
		default:
			return state;
	}
}

const Reducer = combineReducers( { route, status } )

export default Reducer