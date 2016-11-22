import { expect } from 'chai'
import { findId, sleep } from './selenium'

// User credentials for testing
exports.creds = {
    username: 'qh5test',
    password: 'measure-kill-house'
}

// Login and logout shorcut to be used in 
// every e2e test.
exports.login = () => 
    sleep(500)
    .then(findId('id').clear())
    .then(findId('pwd').clear())
    .then(findId('id').sendKeys(exports.creds.username))
    .then(findId('pwd').sendKeys(exports.creds.password))
    .then(findId('btnLogin').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('btnLogout').click())
    .then(sleep(2000))
