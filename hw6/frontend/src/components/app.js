import React from 'react'
import { connect } from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

const App = ( {location} ) => {
	let currentView
	// Render different views according to the location in state
	switch(location) {
		case 'main': currentView = <Main/>; break;
		case 'profile': currentView = <Profile/>; break;
		case 'landing' : currentView = <Landing/>; break;
		default: currentView = <Landing/>; break;
	}
	return(
		<div>
			{ currentView }
		</div>
	)
}

export default connect((state) => {
	return { location : state.route.location }
})(App)