import React, { Component, propTypes } from 'react'
import { connect } from 'react-redux'

class ProfileForm extends Component {

	render() { return (
		<div className="row">
			<div className="col-sm-6 col-md-6">
				<a href="main.html" className="btn btn-success btn-block">Main Page</a>
				<img src="profile.jpg" className="img-circle center-block" width="200px" height="200px"/>
				<input type="file" name="file" id="profileImg" className="inputfile" />
				<label htmlFor="profileImg" className="btn btn-info btn-block">Upload</label>
				<h4>Current info:</h4>
				<ul className="list-group">
  					<li className="list-group-item" id="currentDisplayName"></li>
  					<li className="list-group-item" id="currentEmailAddress"></li>
  					<li className="list-group-item" id="currentPhoneNumber"></li>
  					<li className="list-group-item" id="currentBrithday"></li>
  					<li className="list-group-item" id="currentZipcode"></li>
				</ul>
			</div>

			<div className="col-sm-6 col-md-6" id="updateInfo">
				<h4>Update Info:</h4>
				<label>Display name: </label>
				<input className="form-control" type="text" id="displayName"/>
				<div className="row">&nbsp;</div>
				<label>Email address: </label>
				<input className="form-control" type="email" id="emailAddress"/>
				<div className="row">&nbsp;</div>
				<label>Phone number: </label>
				<input className="form-control" type="tel" id="phoneNumber"/>
				<div className="row">&nbsp;</div>
				<label>Zipcode: </label>
				<input className="form-control" type="number" id="zipcode"/>
				<div className="row">&nbsp;</div>
				<label>Password: </label>
				<input className="form-control" type="password" id="password"/>
				<div className="row">&nbsp;</div>
				<label>Password confirmation: </label>
				<input className="form-control" type="password" id="pwdConfirm"/>
				<div className="row">&nbsp;</div>
				<div className="alert alert-danger" id="alert"></div>
				<div className="alert alert-success" id="alertS"></div>
				<input type="button" className="btn btn-info btn-block" value="Update" id="btnUpdate" />
			</div>
		</div>
	)

	}

}

export default ProfileForm