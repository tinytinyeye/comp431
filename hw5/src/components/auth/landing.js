import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

let ErrorMsg = ({ errorMsg, successMsg }) => {
	return (
		<div className="row">
		{
			errorMsg === "" ? "" :
			<div className="alert alert-danger" id="errorMsg">
				{ errorMsg }
				<div className="row">&nbsp;</div>
			</div>
			
		}
		{
			successMsg === "" ? "" :
			<div className="alert alert-danger" id="successMsg">
				{ successMsg }
				<div className="row">&nbsp;</div>
			</div>
		}
		</div>
	)
}

ErrorMsg.PropTypes = {
	errorMsg: PropTypes.string.isRequired,
	successMsg: PropTypes.string.isRequired
}

ErrorMsg = connect((state) => {
	return { errorMsg: state.status.errorMsg, 
			 successMsg: state.status.successMsg }
})(ErrorMsg)

const Landing = () => {
	return (
		<div className="container">
		<div className="jumbotron">
			<h1>Welcome to Ricebook!</h1>
			<div>Ricebook is just like Facebook.
			   <div className="row">&nbsp;</div>
			   Users can share their everyday moments with their friends.
			   <div className="row">&nbsp;</div>
			</div>
		</div>

		<Login/>
		<ErrorMsg/>
		<Register/>
	</div>
	)
}

export default Landing