import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { validate } from './authActions'

const Register = ( { validate } ) => {
    let username, email, zipcode, pwd, pwdConfirm, dob;

    return (
		<div className="col-sm-6 col-md-6">
  			<div className="container">
    		<h3>New User?</h3>
    		<div className="row">&nbsp;</div>
  			</div>
  		  <form id="regForm" onSubmit={(e) => {
          if (e) e.preventDefault();
          validate(username.value, email.value,
            zipcode.value, dob.value, pwd.value, pwdConfirm.value)
          }}>
        <div className="form-group">
            <label>Username:</label>
            <input className="form-control" id="username" required
              placeholder="username" ref={(node) => username = node}/>
        </div>
    		<div className="form-group">
        		<label>Email address:</label>
        		<input type="email" className="form-control" id="email" required
        			placeholder="abc@gmail.com" ref={(node) => email = node}/>
    		</div>

    		<div className="form-group">
        		<label>Zipcode:</label>
        		<input type="number" className="form-control"
            id="zipcode" required
        			placeholder="77005" ref={(node) => zipcode = node}/>
    		</div>

        <div className="form-group">
        		<label>Birthday:</label>
        		<input type="date" className="form-control"
            id="birthday" required
        			placeholder="Mar 21 2012" ref={(node) => dob = node}/>
    		</div>

    		<div className="form-group">
        		<label>Password:</label>
        		<input type="password" className="form-control" id="password" required
        			ref={(node) => pwd = node}/>
    		</div>

    		<div className="form-group">
        		<label>Password confirmation:</label>
        		<input type="password" className="form-control"
            id="pwdConfirm" required
        			ref={(node) => pwdConfirm = node}/>
    		</div>

    		<div className="form-group">
      			<input type="submit"
            className="btn btn-success btn-block"
            value="Submit" id="btnSubmit"/>
      			<input type="reset" className="btn btn-warning btn-block"
            value="Clear"/>
    		</div>

		</form>
		</div>
	)
}

export default connect(null, (dispatch) => {
  return {
    validate: (username, email, zipcode, dob, pwd, pwdConfirm) =>
    dispatch(validate(username, email, zipcode, dob, pwd, pwdConfirm))
  }
})(Register)
