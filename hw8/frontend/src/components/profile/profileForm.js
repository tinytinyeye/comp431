import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { validateProfile, changeAvatar } from './profileActions'
import { AlertMsg } from '../auth/landing'
import { oauthLogin, linkLogin, unlink } from '../auth/authActions'

// Display user profile info and allow user to edit
const ProfileForm = ( {oldEmail, oldZipcode, birthday, avatar, loginAs,
	validateProfile, changeAvatar, linkLogin, unlink } ) => {

	let email, zipcode, password, pwdConfirm, usr, pwd
	return (
		<div className="row">
			<div className="col-sm-6 col-md-6">
				<img src={ avatar } className="img-circle center-block" width="200px"/>
				<input type="file" accept="image/*"
				name="file" id="profileImg" className="inputfile"
				onChange={(e) => changeAvatar(e)}/>
				<label htmlFor="profileImg"
				className="btn btn-info btn-block">Upload</label>
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
				<input type="button" className="btn btn-info btn-block"
					value="Update" id="btnUpdate"
					onClick={(e) => {
						validateProfile(email.value, zipcode.value,
							password.value, pwdConfirm.value)
						// Clear fields
						email.value = ""
						zipcode.value = ""
						password.value = ""
						pwdConfirm.value = ""
					}}
				/>
				{
					console.log("loginAs: " + loginAs)
				}
				{
					loginAs === "local" ?
					<input type="button" className="btn btn-danger btn-block"
						value="Link Google" onClick={(e) => {
							oauthLogin()
						}}/> : ""
				}
				{
					loginAs === "google" ?
					<div className="col-sm-12 col-md-12">
							<h4>Link with local account</h4>
							<label>Username: </label>
							<input className="form-control" id="username"
								ref={(node) => usr = node}/>
								<div className="row">&nbsp;</div>
							<label>Password: </label>
							<input className="form-control" type="password" id="password"
								ref={(node) => pwd = node}/>
							<div className="row">&nbsp;</div>
							<input type="button" className="btn btn-danger btn-block"
							value="Link Local" onClick={(e) => {
								linkLogin(usr.value, pwd.value)
							}}/>
					</div> : ""
				}
				{
					loginAs === "linked" ?
					<input type="button" className="btn btn-danger btn-block"
					value="Unlink" onClick={(e) => {
						unlink()
					}}/> : ""
				}
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
	validateProfile: PropTypes.function,
	changeAvatar: PropTypes.function
}

export default connect(
	(state) => {return {
		oldEmail: state.profile.email,
		oldZipcode: state.profile.zipcode,
		avatar: state.profile.avatar,
		birthday: state.profile.birthday,
		loginAs: state.loginType.loginAs
	}},
	(dispatch) => {return {
		validateProfile: (email, zipcode, password, pwdConfirm) =>
		dispatch(validateProfile(email, zipcode, password, pwdConfirm)),
		changeAvatar: (e) => dispatch(changeAvatar(e)),
		linkLogin: (usr, pwd) => dispatch(linkLogin(usr, pwd)),
		unlink: () => dispatch(unlink())
	}}
)(ProfileForm)
