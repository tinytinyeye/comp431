import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { validate } from './authActions'

const Register = ( { validate } ) => {
    let email, zipcode, pwd, pwdConfirm;
	
    return (
		<div className="col-sm-6 col-md-6">
  			<div className="container">
    		<h3>New User?</h3>
    		<div className="row">&nbsp;</div>
  			</div>
  		  <form id="regForm" onSubmit={(e) => {
          if (e) e.preventDefault();
          validate(email.value, zipcode.value, pwd.value, pwdConfirm.value)
          }}>
    		<div className="form-group">
        		<label>Email address:</label>
        		<input type="email" className="form-control" name="email" required
        			placeholder="abc@gmail.com" ref={(node) => email = node}/>
    		</div>

    		<div className="form-group">
        		<label>Zipcode:</label>
        		<input type="number" className="form-control" name="zipcode" required
        			placeholder="77005" ref={(node) => zipcode = node}/>
    		</div>

    		<div className="form-group">
        		<label>Password:</label>
        		<input type="password" className="form-control" name="pwd" required
        			ref={(node) => pwd = node}/>
    		</div>

    		<div className="form-group">
        		<label>Password confirmation:</label>
        		<input type="password" className="form-control" name="pwdConfirm" required
        			ref={(node) => pwdConfirm = node}/>
    		</div>

    		<div className="form-group">
      			<input type="submit" className="btn btn-success btn-block" value="Submit" id="btnSubmit"/>
      			<input type="reset" className="btn btn-warning btn-block" value="Clear"/>
    		</div>

		</form>
		</div>
	)
}

export default connect(null, (dispatch) => {
  return {
    validate: (email, zipcode, pwd, pwdConfirm) =>
    dispatch(validate(email, zipcode, pwd, pwdConfirm))
  }
})(Register)