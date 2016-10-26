import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { validateProfile } from './profileActions'
import { AlertMsg } from '../auth/landing'

const ProfileForm = ( {oldEmail, oldZipcode, birthday, avatar, 
	validateProfile} ) => {
	
	let email, zipcode, password, pwdConfirm
	return (
		<div className="row">
			<div className="col-sm-6 col-md-6">
				<img src={ avatar } className="img-circle center-block"/>
				<input type="file" name="file" id="profileImg" className="inputfile" />
				<label htmlFor="profileImg" className="btn btn-info btn-block">Upload</label>
				<h4>Current info:</h4>
				<ul className="list-group">
  					<li className="list-group-item" id="currentEmailAddress">
  						Email: { oldEmail }</li>
  					<li className="list-group-item" id="currentZipcode">
  						Zipcode: { oldZipcode }</li>
  					<li className="list-group-item" id="birthday">
  						Birthday: { birthday }</li>
				</ul>
			</div>

			<div className="col-sm-6 col-md-6" id="updateInfo">
				<h4>Update Info:</h4>
				<label>Email address: </label>
				<input className="form-control" type="email" id="emailAddress"
					ref={(node) => email = node}/>
				<div className="row">&nbsp;</div>
				<label>Zipcode: </label>
				<input className="form-control" type="number" id="zipcode"
					ref={(node) => zipcode = node}/>
				<div className="row">&nbsp;</div>
				<label>Password: </label>
				<input className="form-control" type="password" id="password"
					ref={(node) => password = node}/>
				<div className="row">&nbsp;</div>
				<label>Password confirmation: </label>
				<input className="form-control" type="password" id="pwdConfirm"
					ref={(node) => pwdConfirm = node}/>
				<div className="row">&nbsp;</div>
				<div className="alert alert-danger" id="alert"></div>
				<div className="alert alert-success" id="alertS"></div>
				<input type="button" className="btn btn-info btn-block" 
					value="Update" id="btnUpdate" 
					onClick={(e) => {
						validateProfile(email.value, zipcode.value, 
							password.value, pwdConfirm.value)
						email.value = ""
						zipcode.value = ""
						password.value = ""
						pwdConfirm.value = ""
					}}
				/>
				<div className="row">&nbsp;</div>
				<AlertMsg/>
			</div>
		</div>
	)
}

ProfileForm.PropTypes = {
	oldEmail: PropTypes.string,
	oldZipcode: PropTypes.string,
	avatar: PropTypes.string,
	birthday: PropTypes.string,
	validateProfile: PropTypes.function
}

export default connect(
	(state) => {return { 
		oldEmail: state.profile.email,
		oldZipcode: state.profile.zipcode,
		avatar: state.profile.avatar,
		birthday: state.profile.birthday 
	}},
	(dispatch) => {return {
		validateProfile: (email, zipcode, password, pwdConfirm) => 
		dispatch(validateProfile(email, zipcode, password, pwdConfirm))
	}}
)(ProfileForm)