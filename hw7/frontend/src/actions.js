import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

const local = false
const url = local ? 'http://localhost:4000' : 'https://rice-book.herokuapp.com'

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

// Wrapper for fetch, by default the payload is json
export function resource(method, endpoint, payload, isJson=1) {
  let options =  {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
  }
  if (payload) {
    if (isJson) {
      options.body = JSON.stringify(payload)
      // If payload is not json, set up a new
      // options and use the payload as body
      // directly
    } else {
      options =  {
        method,
        credentials: 'include'
      }
      options.body = payload
    }
  }

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type')
          .indexOf('json') > 0) ? r.json() : r.text()
      } else {
        throw new Error(r.status + " error occurs")
      }
    })
}

export { url }
