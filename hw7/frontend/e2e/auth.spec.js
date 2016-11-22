import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test landing page', () => {

    it('should register a user', (done) => {
        go()
        // fill in registration fields and submit the form
        .then(findId('username').sendKeys('abc'))
        .then(findId('email').sendKeys('abc@bca.com'))
        .then(findId('zipcode').sendKeys('12345'))
        .then(findId('password').sendKeys('123'))
        .then(findId('pwdConfirm').sendKeys('123'))
        .then(findId('btnSubmit').click())
        .then(findId('successMsg').getText()
            .then(msg => {
                // if a success message appears, the registration is
                // successful
                expect(msg).to.be.ok   
            }))
        .then(sleep(500))
        .then(done)
    })

    it('should log in as the test user', (done) => {
        go().then(common.login)
        .then(sleep(500))
        .then(findId('status').getText()
            // If a headline exists, the user is successfully logged in.
            .then(headline => {
                expect(headline).to.be.ok   
            })
            .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
