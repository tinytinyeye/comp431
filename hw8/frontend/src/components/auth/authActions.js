import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

import { updateErrorMsg, updateSuccessMsg,
	navToMain, navToLanding, resource,
	loginAsLocal, loginAsGoogle, loginAsLinked,
	 url } from '../../actions'

import { fetchProfile } from '../profile/profileActions'
import { fetchFollowers } from '../main/followingActions'
import { fetchArticles, fetchAvatars } from '../article/articleActions'

export const validate = (username, email, zipcode, dob,
	password, pwdConfirm) => {
	return (dispatch) => {
		if (!validUsername(username)) {
			dispatch(updateErrorMsg("Account name can only be upper" +
				" or lower case letters and numbers, but may not start" +
				 " with a number."))
		} else if (!validEmail(email)) { // Validate email address.
			dispatch(updateErrorMsg("Please enter a valid email address."))
		} else if (!validZipcode(zipcode)) { // Validate zipcode.
			dispatch(updateErrorMsg("Please enter a valid zipcode."))
		} else if (!validBirthday(dob)) {
			dispatch(updateErrorMsg("You need to be at least 18 years old. "))
		} else if (!confirmPassword(password, pwdConfirm)) { // Validate password.
			dispatch(updateErrorMsg("Please enter the same "+
				"password for confirmation."))
		} else {
			// let bday = Date.parse(dob)
			dispatch(register({ username, email, zipcode, dob, password }))
		}
	}
}

// Subroutines to validate user information
export const validUsername = (username) => {
	return username.match(/^([A-Za-z])[A-Za-z0-9]*$/)
}

export const validEmail = (email) => {
	return email.match(
		/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g)
}

export const validZipcode = (zipcode) => {
	return zipcode.match(/^\d{5}(-\d{4})?$/)
}

const validBirthday = (dob) => {
	const birthday = new Date(Date.parse(dob))
	const today = new Date()
	const cutoffDate = new Date()
	// Compute cutoff date for age validation.
	cutoffDate.setFullYear(today.getFullYear() - 18,
		today.getMonth(), today.getDate())
	if (birthday < cutoffDate) {
		return true
	} else {
		return false
	}
}

export const confirmPassword = (pwd, pwdConfirm) => {
	return (pwd == pwdConfirm) ? true : false
}

// send the register form after validation
export const register = (payload) => {
	return (dispatch) => {
		resource('POST', 'register', payload)
			.then(dispatch(updateSuccessMsg("Successfully registered")))
	}
}

// First try to get login status, if status is fetched, it means
// that we are authorized and therefore we should move to main page
// and fetch other info. Else we should stay in landing page.
export const initialVisit = () => {
	return (dispatch) => {
		resource('GET', 'status')
			.then(r => {
				console.log("r.status")
				console.log(r.status)
				switch (r.status) {
					case "local":
						dispatch(loginAsLocal())
						break;
					case "google":
						dispatch(loginAsGoogle())
						break;
					case "linked":
						dispatch(loginAsLinked())
						break;
					default:
						dispatch(loginAsLocal())
				}
				dispatch(navToMain())
				dispatch(fetchProfile())
				dispatch(fetchFollowers())
				dispatch(fetchArticles())
				dispatch(fetchAvatars())
			})
			.catch(r => dispatch(navToLanding()))
	}
}

// Login and fetch contents in main page
export const login = (username, password) => {
    return (dispatch) => {
      resource('POST', 'login', { username, password })
			.then(r => dispatch(loginAsLocal()))
      .then(r => dispatch(initialVisit()))
      .catch(r => dispatch(updateErrorMsg("Invalid username or password")))
    }
}

export const oauthLogin = () => {
		window.location = url + "/oauth/google"
}

export const linkLogin = (username, password) => {
	return (dispatch) => {
		resource('POST', 'oauth/link', { username, password })
			.then(r => dispatch(initialVisit()))
			.catch(r => dispatch(updateErrorMsg("Invalid username or password")))
	}
}

export const unlink = () => {
	return (dispatch) => {
		resource('PUT', 'oauth/unlink')
			.then(r => dispatch(initialVisit()))
			.catch(r => dispatch(updateErrorMsg("Cannot unlink")))
	}
}



// Logout clears articles
export const logout = () => {
  return (dispatch) => {
    resource('PUT', 'logout')
    .then(r => dispatch({ type: "CLEAR_ARTICLES" }))
    .then(r => dispatch(navToLanding()))
    .catch(r => dispatch(updateErrorMsg("Unable to logout")))
  }
}
