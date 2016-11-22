import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test profile page', () => {

    before('should log in and nav to profile page', (done) => {
        go()
        .then(common.login)
        // Nav to profile page after login
        .then(findId('btnProfile').click())
        .then(done)
    })

    it('should update email', (done) => {
        sleep(500)
        .then(findId('emailAddress').sendKeys('test@email.com'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('currentEmailAddress').getText()
            .then(email => {
                // Expect the section that displays current
                // info will display the updated email
                expect(email).eql('Email: test@email.com')
            }))
        .then(done)
    })

    it('should not update email', (done) => {
        sleep(500)
        .then(findId('emailAddress').sendKeys('a@b.c'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('currentEmailAddress').getText()
            .then(email => {
                expect(email).eql('Email: test@email.com')
            }))
        .then(findId('errorMsg').getText()
                .then(msg => {
                    // Expect an error message appears if 
                    // the email is invalid
                    expect(msg).to.be.ok
                }))
        .then(done)
    })

    it('should update zipcode', (done) => {
        sleep(500)
        .then(findId('zipcode').sendKeys('12345'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('currentZipcode').getText()
            .then(zipcode => {
                // Expect the section that displays current
                // info will display the updated zipcode
                expect(zipcode).eql('Zipcode: 12345')
            }))
        .then(done)
    })

    it('should not update zipcode', (done) => {
        sleep(500)
        .then(findId('zipcode').sendKeys('123'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('currentZipcode').getText()
            .then(zipcode => {
                expect(zipcode).eql('Zipcode: 12345')
            }))
        .then(findId('errorMsg').getText()
                .then(msg => {
                    // Expect an error message appears if 
                    // the zipcode is invalid
                    expect(msg).to.be.ok
                }))
        .then(done)
    })

    it('should update password', (done) => {
        sleep(500)
        .then(findId('password').sendKeys('12345'))
        .then(findId('pwdConfirm').sendKeys('12345'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('successMsg').getText()
            .then(msg => {
                // If new password matches the password confirm
                // a success message will show up.
                expect(msg).to.be.ok
            }))
        .then(done)
    })

    it('should not update password', (done) => {
        sleep(500)
        .then(findId('password').sendKeys('12345'))
        .then(findId('pwdConfirm').sendKeys('54321'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('errorMsg').getText()
            .then(msg => {
                // If new password does not match the password confirm
                // an error message will show up.
                expect(msg).to.be.ok
            }))
        .then(done)
    })

    after('should go to main page and log out', (done) => {
        sleep(500)
        .then(findId('btnMain').click())
        .then(sleep(500))
        .then(common.logout())
        .then(done)
    })
})