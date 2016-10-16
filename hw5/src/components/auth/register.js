import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Register extends Component {

	render() { return (
			<div className="col-sm-6">
      			<div className="container">
        		<h3>New User?</h3>
        		<div className="row">&nbsp;</div>
      			</div>
      		<form id="regForm" method="GET" action="main.html">
				<div className="form-group">
          			<label>Account name:</label>
          			<input type="text" className="form-control" name="account" required
          				ref={(node) => this.username = node }/>
        		</div>

        		<div className="form-group">
            		<label>Email address:</label>
            		<input type="email" className="form-control" name="email" required
            			ref={(node) => this.email = node}/>
        		</div>

        		<div className="form-group">
            		<label>Phone number:</label>
            		<input type="tel" className="form-control" name="phone" required
            			ref={(node) => this.phone = node}/>
        		</div>

        		<div className="form-group">
            		<label>Date of birth:</label>
            		<input type="date" className="form-control" name="birthday" required
            			ref={(node) => this.birthday = node}/>
        		</div>

        		<div className="form-group">
            		<label>Zipcode:</label>
            		<input type="number" className="form-control" name="zipcode" required
            			ref={(node) => this.zipcode = node}/>
        		</div>

        		<div className="form-group">
            		<label>Password:</label>
            		<input type="password" className="form-control" name="pwd" required
            			ref={(node) => this.pwd = node}/>
        		</div>

        		<div className="form-group">
            		<label>Password confirmation:</label>
            		<input type="password" className="form-control" name="pwdConfirm" required
            			ref={(node) => this.pwdConfirm = node}/>
        		</div>

        		<div className="form-group">
          			<input type="submit" className="btn btn-success btn-block" value="Submit" id="btnSubmit"/>
          			<input type="reset" className="btn btn-warning btn-block" value="Clear"/>
        		</div>

    		</form>
    		</div>
		)
	}
}

export default connect()(Register)