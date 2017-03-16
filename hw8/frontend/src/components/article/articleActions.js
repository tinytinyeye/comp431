import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'
import { resource, updateErrorMsg, updateSuccessMsg } from '../../actions'
import { initialVisit } from '../auth/authActions'

// Fetch all articles from server, use article id as key to store
// articles into a json object and store it to redux store.
export const fetchArticles = () => {
	return (dispatch) => {
		resource('GET', "articles").then(r => r.articles).then(r => {
			let articles = {}
			r.forEach((article) => {
				if (article) {
					articles[article._id] = article
				}
			})
			dispatch(updateArticles(articles))
		})
	}
}

// Fetch avatars of all authors in the article list, use username
// as key and img as value.
export const fetchAvatars = () => {
	return (dispatch) => {
		resource('GET', "following")
			.then(r => r.following)
			.then(r => {
				let avatars = {}
				let promiseList = []
				r.forEach((user) => {
					avatars[user] = {}
				})
				// Add each fetch request to a promise list so that
				// the avatar list will not be pushed to redux store
				// until all promises are resolved.
				r.forEach((user) => {
					let promise =
						resource('GET', 'avatars/' + user).then(res => {
								avatars[user] = res.avatars[0].avatar
						})
					promiseList.push(promise)
				})
				// Add user itself to the promise list
				let promise = resource('GET', 'avatars').then(res => {
					avatars[res.avatars[0].username] = res.avatars[0].avatar
				})
				promiseList.push(promise)
				// Update avatar list after all avatars are fetched
				Promise.all(promiseList)
					.then(() => {
						dispatch(updateAvatars(avatars))
					})
			})
	}
}

// Action creators
export const updateArticles = (articles) => {
	return {type: "UPDATE_ARTICLES", articles}
}

export const updateAvatars = (avatars) => {
	return {type: "UPDATE_AVATARS", avatars}
}

export const updateKeyword = (keyword) => {
	return {type: "UPDATE_KEYWORD", keyword}
}

// Add a new article to the article feed.
// Send the form data containing the content
// of the new article to the server and add
// the article from the response to the redux
// state.
export const addArticle = (text, image) => {
	return (dispatch) => {
		let fd = new FormData()
		fd.append('text', text)
		if (image) {
			fd.append('image', image)
		}
		resource('POST', 'article', fd, 0)
			.then(r => {
				let id = r.articles[0]._id
				let article = { id : r.articles[0] }
				// Refresh main page
				dispatch(initialVisit())
				return { type: "UPDATE_ARTICLE", article }
			})
		}
}

export const updateArticle = (text, id) => {
	return (dispatch) => {
		let url = 'articles/' + id
		resource('PUT', url, { text })
			.then(r => {
				let article = {id : r.articles[0]}
				return {type: "UPDATE_ARTICLE", article}
			})
	}
}

export const updateComment = (text, id, commentId) => {
	return (dispatch) => {
		let url = 'articles/' + id
		resource('PUT', url, { text, commentId })
			.then(r => {
				let article = {id : r.articles[0]}
				// Refresh main page
				dispatch(initialVisit())
				return {type: "UPDATE_ARTICLE", article}
			})
	}
}

// Parse date for better visual experience
export const parseDate = (date) => {
	let day = date.split("T")[0]
	let time = date.split("T")[1].split(".")[0]
	return "on " + day + " at " + time
}

// Sort function for articles
export const sortByDate = (a, b) => {
	let day1 = a.date.split("T")[0]
	let day2 = b.date.split("T")[0]
	let dayDiff = new Date(day1) - new Date(day2)
	if (dayDiff < 0) {
		return 1;
	} else if (dayDiff > 0) {
		return -1;
	// If two articles are on the same day
	} else {
		let time1 = a.date.split("T")[1].split(".")[0].split(":")
		let time2 = b.date.split("T")[1].split(".")[0].split(":")
		let s1 = time1[0]*60*60 + time1[1]*60 + time1[2]
		let s2 = time2[0]*60*60 + time2[1]*60 + time2[2]
		let sDiff = s1 - s2
		if (sDiff < 0) {
			return 1;
		} else if (sDiff > 0) {
			return -1;
		} else {
			return 0;
		}
	}
}

// Filter articles by author and body
export const filterByKeyword = (article, keyword) => {
	if (keyword === "") {
		return true
	} else {
		keyword = keyword.toLowerCase()
		console.log(article)
		console.log(article.author)
		console.log(article.text)
		if ((article.author.toLowerCase().indexOf(keyword) != -1) ||
			(article.text.toLowerCase().indexOf(keyword)) != -1) {
			return true
		}
		return false
	}
}
