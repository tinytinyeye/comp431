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
						dispatch(updateBirthday(new Date(parseInt(r.dob)).toDateString())); break;
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

// Validate all profile inputs are valid
export const validateProfile = (email, zipcode, password, pwdConfirm) => {
	return (dispatch) => {
		if (!validEmail(email) && email) { // Validate email address.
			dispatch(updateErrorMsg("Please enter a valid email address."))
		} else if (!validZipcode(zipcode) && zipcode) { // Validate zipcode.
			dispatch(updateErrorMsg("Please enter a valid zipcode."))
		} else if (!confirmPassword(password, pwdConfirm)
		&& password && pwdConfirm) { // Validate password.
			dispatch(updateErrorMsg("Please enter the "+
				"same password for confirmation."))
		} else {
			// dispatch(updateSuccessMsg("Successfully updated"))
			dispatch(updateProfile(email, zipcode, password))
		}
	}
}

// Update profile info in the profile page
export const updateProfile = (email, zipcode, password) => {
	return (dispatch) => {
		if (email !== "") dispatch(changeEmail(email))
		if (zipcode !== "") dispatch(changeZipcode(zipcode))
		if (password !== "") dispatch(changePassword(password))
	}
}

// Action creators
const updateAvatar = (avatar) => {
	return {type: "UPDATE_AVATAR", avatar}
}
const updateZipcode = (zipcode) => {
	return {type: "UPDATE_ZIPCODE", zipcode}
}
const updateEmail = (email) => {
	return {type: "UPDATE_EMAIL", email}
}
const updateName = (name) => {
	return {type: "UPDATE_NAME", name}
}
const updateHeadline = (headline) => {
	return {type: "UPDATE_HEADLINE", headline}
}
const updateBirthday = (birthday) => {
	return {type: "UPDATE_BIRTHDAY", birthday}
}

// Change the headline in the main page
export const changeHeadline = (username, headline) => {
	return (dispatch) => {
		resource('PUT', 'headline', { username, headline })
			.then(dispatch(updateHeadline(headline)))
	}
}

// Upload new avatar
export const changeAvatar = (e) => {
	return (dispatch) => {
		let file = e.target.files[0]
		let fd = new FormData()
		fd.append('image', file)
		resource('PUT', 'avatar', fd, 0)
			.then(r => {
				dispatch(updateAvatar(r.avatar))
			})
	}
}

// Send the updated email address to server
// and update the current email in front end
const changeEmail = (email) => {
	return (dispatch) => {
		resource('PUT', 'email', { email })
			.then(r => {
				dispatch(updateEmail(r.email))
			})
	}
}

// Send the updated zipcode to server
// and update the current zipcode in front end
const changeZipcode = (zipcode) => {
	return (dispatch) => {
		resource('PUT', 'zipcode', { zipcode })
			.then(r => {
				dispatch(updateZipcode(r.zipcode))
			})
	}
}

// Send the updated password to server
// and show a success message to user
const changePassword = (password) => {
	return (dispatch) => {
		resource('PUT', 'password', { password: password })
			.then(r => {
				dispatch(updateSuccessMsg("Password updated successfully."))
			})
	}
}

export { fetchField, fetchProfile }
