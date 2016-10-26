import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

const url = 'https://webdev-dummy.herokuapp.com'

// Actions for navigation and message update
export function navToProfile() { return { type: "PROFILE" } }
export function navToMain() { return { type: "MAIN" } }
export function navToLanding() { return { type: "LANDING" } }
export function updateSuccessMsg(successMsg) { 
  return { type: "SUCCESS", successMsg } 
}
export function updateErrorMsg(errorMsg) { 
  return { type: "ERROR", errorMsg } 
}

// Wrapper for fetch
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
        return (r.headers.get('Content-Type')
          .indexOf('json') > 0) ? r.json() : r.text()
      } else {
        throw new Error(r.status + "error occurs")
      }
    })
}

export { url }