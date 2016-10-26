import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'
import { validEmail, validZipcode, confirmPassword } from '../auth/authActions'
import { resource, updateErrorMsg, updateSuccessMsg } from '../../actions'

// Fetch a single field of profile info
const fetchField = (field) => {
	return (dispatch) => {
		resource('GET', field)
			.then((r) => {
				switch(field) {
					case "avatars":
						dispatch(updateAvatar(r.avatars[0].avatar)); break;
					case "zipcode":
						dispatch(updateZipcode(r.zipcode)); break;
					case "email" :
						dispatch(updateEmail(r.email)); break;
					case "dob":
						dispatch(updateBirthday((new Date(r.dob))
												.toDateString())); break;
					case "headlines":
						dispatch(updateHeadline(r.headlines[0].headline));
						dispatch(updateName(r.headlines[0].username));
						break;
				}
			})
	}
}

// Fetch all fields of profile info
const fetchProfile = () => {
	return (dispatch) => {
		dispatch(fetchField("avatars"))
		dispatch(fetchField("zipcode"))
		dispatch(fetchField("email"))
		dispatch(fetchField("dob"))
		dispatch(fetchField("headlines"))
	}
}

// Update profile info in the profile page
export const updateProfile = (email, zipcode, password) => {
	return (dispatch) => {
		if (email !== "") dispatch(updateEmail(email))
		if (zipcode !== "") dispatch(updateZipcode(zipcode))
		if (password !== "") dispatch(updatePassword(password))
	}
}

// Action creators
export const updateAvatar = (avatar) => {return {type: "UPDATE_AVATAR", avatar}}
export const updateZipcode = (zipcode) => {return {type: "UPDATE_ZIPCODE", zipcode}}
export const updateEmail = (email) => {return {type: "UPDATE_EMAIL", email}}
export const updateName = (name) => {return {type: "UPDATE_NAME", name}}
export const updateHeadline = (headline) => {return {type: "UPDATE_HEADLINE", headline}}
export const updateBirthday = (birthday) => {return {type: "UPDATE_BIRTHDAY", birthday}}
export const updatePassword = (password) => {return {type: "UPDATE_PASSWORD", password}}

// Change the headline in the main page
const changeHeadline = (username, headline) => {
	return (dispatch) => {
		resource('PUT', 'headline', { username, headline })
			.then(dispatch(updateHeadline(headline)))
	}
}

// Validate all profile inputs are valid
export function validateProfile(email, zipcode, password, pwdConfirm) {
	return (dispatch) => {
		if (!validEmail(email) && email) { // Validate email address.
			dispatch(updateErrorMsg("Please enter a valid email address."))
		} else if (!validZipcode(zipcode) && zipcode) { // Validate zipcode.
			dispatch(updateErrorMsg("Please enter a valid zipcode."))
		} else if (!confirmPassword(password, pwdConfirm) && password && pwdConfirm) { // Validate password.
			dispatch(updateErrorMsg("Please enter the same password for confirmation."))
		} else {
			dispatch(updateSuccessMsg("Successfully updated"))
			dispatch(updateProfile(email, zipcode, password))
		}
	}
}

export { fetchField, fetchProfile, changeHeadline }