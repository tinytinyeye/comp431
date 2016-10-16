import React from 'react'
import { connect } from 'react-redux'

const Login = ( { dispatch } ) => {
	let username, password

	return(
		<div className="col-sm-6">
			<div className="container">
        		<h3>Already have an account?</h3>
        		<div className="row">&nbsp;</div>
      			<div className="row">
          			<div className="col-sm-8" id="loginId">
            		<label>Username:</label>
            		<input className="form-control" type="text" id="id"
            			ref={(node) => {username = node}} /><br/>
          			</div>
        		</div>

        		<div className="row">
          			<div className="col-sm-8" id="loginPwd">
            		<label>Password:</label>
            		<input className="form-control" type="password" id="pwd"
            			ref={(node) => { password = node }} /><br/>
          			</div>
        		</div>

        		<div className="row">
          			<div className="col-sm-8" id="login">
            		<button type="button" className="btn btn-success btn-block" id="btnLogin">Login</button>
          			</div>
        		</div>
      		</div>
    	</div>
	)
}

export default connect()(Login)