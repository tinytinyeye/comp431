import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { navToMain } from '../../actions'

import ProfileForm from './profileForm'

// Profile page of the website, contains a button to jump to main page.
const Profile = ( { navToMain } ) => {
	return(
		<div className="container">
			<div className="row">&nbsp;</div>
			<button className="btn btn-success btn-block" 
					onClick={(e) => navToMain()}>Main Page</button>
			<ProfileForm />
		</div>
	)
}

export default connect(null, (dispatch) => {
	return {
		navToMain: () => dispatch(navToMain())
	}
})(Profile)