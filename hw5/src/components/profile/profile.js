import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'

const Profile = () => {
	return(
		<div className="container">
			<div className="row">&nbsp;</div>
			<ProfileForm />
		</div>
	)
}

export default Profile