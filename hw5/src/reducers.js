import { combineReducers } from 'redux'

// Reducers for the app

// Profile related reducer
function profile(state = { name: '', email: '', zipcode: '', 
	avatar : '', headline: '', birthday: '', password: ''}, action) {
	switch (action.type) {
		case "UPDATE_AVATAR":
			return {...state, avatar : action.avatar}
		case "UPDATE_NAME":
			return {...state, name : action.name}
		case "UPDATE_EMAIL":
			return {...state, email : action.email}
		case "UPDATE_ZIPCODE":
			return {...state, zipcode : action.zipcode}
		case "UPDATE_HEADLINE":
			return {...state, headline : action.headline}
		case "UPDATE_BIRTHDAY":
			return {...state, birthday : action.birthday}
		case "UPDATE_PASSWORD":
			return {...state, password : action.password}
		default: 
			return state;
	}
}

// Following related reducer
function following(state = { followers: {} }, action) {
	switch (action.type) {
		case "UPDATE_FOLLOWERS":
			return { followers: action.followers }
		default:
			return state;

	}
}

// Articles related reducer
function articles(state = { articles: {}, avatars: {}, keyword: "" }, action) {
	const clear = { articles: {}, avatars: {}, keyword: "" }
	switch (action.type) {
		case "ADD_ARTICLE":
			return state;
		case "UPDATE_ARTICLES":
			return { ...state, articles: action.articles }
		case "UPDATE_AVATARS" :
			return { ...state, avatars: action.avatars }
		case "UPDATE_KEYWORD" :
			return { ...state, keyword: action.keyword }
		case "CLEAR_ARTICLES" :
			return { ...clear }
		default:
			return state;
	}
}

// Status related reducer
function status(state = { errorMsg: '', successMsg: '' }, action) {
	switch (action.type) {
		case "SUCCESS":
			return { errorMsg: '', successMsg: action.successMsg }
		case "ERROR":
			return { errorMsg: action.errorMsg, successMsg: ''}
		default:
			return { errorMsg: '', successMsg: ''};
	}
	
}

// Route related reducer
function route(state = { location: 'landing' }, action) {
	switch (action.type) {
		case "PROFILE":
			return { location: 'profile'}
		case "MAIN":
			return { location: 'main'}
		case "LANDING":
			return { location: 'landing'}
		default:
			return state;
	}
}

// Combine all reducers into one for external use
const Reducer = combineReducers( { profile, route, 
	status, following, articles } )

export default Reducer
export { profile, following, route, status, articles }