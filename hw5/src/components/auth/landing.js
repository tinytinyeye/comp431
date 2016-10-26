import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

// Component used for error and success message display
let AlertMsg = ({ errorMsg, successMsg }) => {
	return (
		<div className="row">
		<div className="col-sm-12 col-md-12">
			{
			errorMsg === "" ? "" :
			<div className="alert alert-danger" id="errorMsg">
				{ errorMsg }
			</div>
			
			}
			{
			successMsg === "" ? "" :
			<div className="alert alert-success" id="successMsg">
				{ successMsg }
			</div>
			}
		</div>
		</div>
	)
}

AlertMsg.PropTypes = {
	errorMsg: PropTypes.string.isRequired,
	successMsg: PropTypes.string.isRequired
}

AlertMsg = connect((state) => {
	return { errorMsg: state.status.errorMsg, 
			 successMsg: state.status.successMsg }
})(AlertMsg)

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
		<AlertMsg/>
		<Login/>
		<Register/>
	</div>
	)
}

export default Landing
export { AlertMsg }