import { expect } from 'chai'
import { go, sleep, findId, findCSS, 
    findElements, By } from './selenium'
import common from './common'

describe('Test main page', () => {

    before('should log in', (done) => {
        go()
        .then(common.login)
        .then(done)
    })

    it('should update headline', (done) => {
        sleep(500)
        .then(findId('txtStatus').clear())
        // first submit an empty headline so that the original headline
        // is cleared.
        .then(findId('txtStatus').sendKeys(''))
        .then(findId('btnUpdate').click())
        .then(findId('txtStatus').sendKeys('This is my new headline'))
        .then(findId('btnUpdate').click())
        .then(sleep(500))
        .then(findId('status').getText()
            .then(headline => {
                expect(headline).eql('This is my new headline')
            }))
        .then(done)
    })

    it('should find an article', (done) => {
        sleep(500)
        .then(findId('searchFld').sendKeys('Only One Article Like This'))
        .then(sleep(500))
        .then(findCSS('.author').getText()
                .then(author => {
                    expect(author).eql('qh5test')
                }))
        .then(done)
    })

    it('should add a follower', (done) => {
        findElements('.follower')
            .then((elms) => {
                let followerCount = elms.length
                findId('newFriend').sendKeys('Follower')
                    .then(findId('btnAdd').click())
                    .then(sleep(500))
                    .then(findElements('.follower')
                            .then((elms) => {
                                // count the number of followers,
                                // expect one more follower appears
                                expect(elms.length).eql(followerCount + 1)
                            }))
                    .then(done)
            })
    })

    it('should remove a follower', (done) => {
        // this test will remove the follower named "Follower"
        // we added in the previous test.
        sleep(500)
        .then(findElements('.follower')
            .then((elms) => {
                let followerCount = elms.length
                // by setting the name of "unfollower" button for 
                // each follower to the name of the follower,
                // we can easily locate the exact unfollow button
                // we want to click.
                findCSS('[name="Follower"]').click()
                    .then(sleep(500))
                    .then(findElements('.follower')
                            .then((elms) => {
                                expect(elms.length).eql(followerCount - 1)
                            }))
                    .then(done)
            })
        )
    })

    it('should add a new article', (done) => {
        // Using the current time text content ensures
        // the content is unique.
        let text = (new Date()).toTimeString()
        findId('post').sendKeys(text)
            .then(findId('btnPost').click())
            .then(sleep(500))
            // By using the search field, we can pinpoint
            // the exact article we just created.
            .then(findId('searchFld').clear())
            .then(findId('searchFld').sendKeys(text))
            .then(sleep(500))
            // Since only one artile will appear in the
            // article feed, we can easily get the text
            // with name
            .then(findCSS('[name="article"]').getText()
                    .then(txt => {
                        expect(txt).eql(text)
                    })
                    .then(done))
    })

    it('should edit an article', (done) => {
        let text = (new Date()).toTimeString()
        // Start by posting an article with current time stamp
        findId('post').sendKeys(text)
            .then(findId('btnPost').click())
            .then(sleep(500))
            // Locate the article we just created and check the
            // text
            .then(findId('searchFld').clear())
            .then(findId('searchFld').sendKeys(text))
            .then(sleep(500))
            .then(findCSS('[name="article"]').getText()
                    .then(txt => {
                        expect(txt).eql(text)
                    })
                    // Change the article content to the edited version
                    .then(findCSS('[name="article"]').clear())
                    .then(findCSS('[name="article"]')
                        .sendKeys(text + ' edited'))
                    // Update the article
                    .then(findCSS('[name="edit"]').click())
                    // Refresh the article feed by first going to 
                    // profile page and then return to main page.
                    .then(findId('btnProfile').click())
                    .then(findId('btnMain').click())
                    .then(sleep(500))
                    // Locate the article for testing
                    .then(findId('searchFld').clear())
                    .then(findId('searchFld').sendKeys(text))
                    .then(sleep(500))
                    // Check if the article content is changed.
                    .then(findCSS('[name="article"]').getText()
                        .then(txt => {
                            expect(txt).eql(text + ' edited')
                        })
                        .then(done)))
    })

    after('should log out', (done) => {
        sleep(500)
        .then(common.logout())
        .then(done)
    })
})