// var Article = require('./model.js').Article

// new Article({ author: 'sep1', img: null, date: new Date().getTime(), text: 'This is my first article', comments: []}).save()
// new Article({ author: 'sep1', img: null, date: new Date().getTime(), text: 'This is my second article', comments: []}).save()
// new Article({ author: 'jmg3', img: null, date: new Date().getTime(), text: "This is Max's article", comments: []}).save(function() {
//      console.log('done with save')
//      Article.find().exec(function(err, items) { 
//           console.log("There are " + items.length + " articles total in db") 

//           process.exit()
//      })
// })
// const User = require('./model.js').User

// User.find({ username : "qh5test" }).exec(function(err, user) {
// 	console.log("The user looks like this:")
// 	console.log(user)
// 	process.exit()
// })
const Article = require('./model.js').Article

Article.find({ _id : "5831374b24a80e0012b4424b" }).exec(function(err, articles) {
	console.log("All the articles look like this: ")
	console.log(articles)
	process.exit()
})

