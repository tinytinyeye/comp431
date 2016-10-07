import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: "qh5test",
    password: "measure-kill-house"
}

exports.login = () => 
    sleep(500)
    .then(findId('username').clear())
    .then(findId('password').clear())
    .then(findId('username').sendKeys(exports.creds.username))
    .then(findId('password').sendKeys(exports.creds.password))
    .then(findId('login').click())
    .then(sleep(2000))

exports.logout = () => {
    const preamble = 'You have logged out'
    sleep(500)
    .then(findId('logout').click())
    .then(findId('message').getText()
    .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            }))
}
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'
