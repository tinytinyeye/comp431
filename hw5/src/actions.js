import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'


const local = true
export const url = local ? 'http://localhost:5555' : 'https://webdev-dummy.herokuapp.com'

const Action = {
	 NAV_PROFILE: 'NAV_PROFILE',
   NAV_MAIN: 'NAV_MAIN',
   NAV_LANDING: 'NAV_LANDING',
   SUCCESS: 'SUCCESS',
   ERROR: 'ERROR'
}

export default Action

export function navToProfile() { return { type: Action.NAV_PROFILE }}
export function navToMain() { return { type: Action.NAV_MAIN }}
export function navToLanding() { return { type: Action.NAV_LANDING }}
export function updateSuccessMsg(successMsg) {return { type: Action.SUCCESS, successMsg }}
export function updateErrorMsg(errorMsg) {return { type: Action.ERROR, errorMsg }}


export function resource(method, endpoint, payload) {
  	const options =  {
    	method,
    	credentials: 'include',
    	headers: {
    		'Content-Type': 'application/json'
    	}
  	}
  	if (payload) options.body = JSON.stringify(payload)

  	return fetch(`${url}/${endpoint}`, options)
    	.then(r => {
      		if (r.status === 200) {
        		return (r.json())
      		} else {
        		// useful for debugging, but remove in production
        		const errorMessage = `${method} ${endpoint} ${JSON.stringify(response.json())}`
        		console.error(errorMessage);
        		throw new Error(errorMessage);
      		}
    	})
}
