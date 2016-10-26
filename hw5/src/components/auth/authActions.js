import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

import { updateErrorMsg, updateSuccessMsg, 
	navToMain, navToLanding, resource } from '../../actions'

import { fetchProfile } from '../profile/profileActions'
import { fetchFollowers } from '../main/followingActions'
import { fetchArticles, fetchAvatars } from '../article/articleActions'

export const validate = (email, zipcode, pwd, pwdConfirm) => {
	return (dispatch) => {
		if (!validEmail(email)) { // Validate email address.
			dispatch(updateErrorMsg("Please enter a valid email address."))
		} else if (!validZipcode(zipcode)) { // Validate zipcode.
			dispatch(updateErrorMsg("Please enter a valid zipcode."))
		} else if (!confirmPassword(pwd, pwdConfirm)) { // Validate password.
			dispatch(updateErrorMsg("Please enter the same password for confirmation."))
		} else {
			dispatch(updateSuccessMsg("Successfully registered"))
		}
	}
}

export const validEmail = (email) => {
	return email.match(
		/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g)
	}

export const validZipcode = (zipcode) => {
	return zipcode.match(/^\d{5}(-\d{4})?$/)
}
export const confirmPassword = (pwd, pwdConfirm) => {
	return (pwd == pwdConfirm) ? true : false
}

// First try to fetch avatars, if avatars are fetched, it means 
// that we are authorized and therefore we should move to main page 
// and fetch other info. Else we should stay in landing page.
export const initialVisit = () => {
	return (dispatch) => {
		resource('GET', 'avatars')
			.then(r => {
				dispatch(navToMain())
				dispatch(fetchProfile())
				dispatch(fetchFollowers())
				dispatch(fetchArticles())
				dispatch(fetchAvatars())
			})
			.catch(r => dispatch(navToLanding()))
	}
}

export const login = (username, password) => {
    return (dispatch) => {
      resource('POST', 'login', { username, password })
      .then(r => dispatch(initialVisit()))
      .catch(r => dispatch(updateErrorMsg("Invalid username or password")))
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
