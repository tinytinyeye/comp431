import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { navToMain } from '../../actions'
import { initialVisit } from '../auth/authActions'

import ProfileForm from './profileForm'

// Profile page of the website, contains a button to jump to main page.
const Profile = ( { initialVisit } ) => {
	return(
		<div className="container">
			<div className="row">&nbsp;</div>
			<button className="btn btn-success btn-block" id="btnMain"
					onClick={(e) => initialVisit()}>Main Page</button>
			<ProfileForm />
		</div>
	)
}

export default connect(null, (dispatch) => {
	return {
		initialVisit: () => dispatch(initialVisit())
	}
})(Profile)