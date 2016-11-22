import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'
import { resource, updateErrorMsg, updateSuccessMsg } from '../../actions'
import { fetchArticles, fetchAvatars } from '../article/articleActions'

// Fetch all the followers from the following list, and then
// fetch all the corresponding headlines and avatars.
export const fetchFollowers = () => {
	return (dispatch) => {
		resource('GET', "following")
			.then(r => r.following)
			.then(r => {
				let followers = {}
				r.forEach((user) => {
					followers[user] = { name: user }
				})

				let promiseList = []
				// Add each fetch request to a promise list so that
				// the follower info will not be pushed to redux store
				// until all promises are resolved.
				r.forEach((user) => {
					let fetchHeadline = 
						resource('GET', 'headlines/' + user)
							.then(res => {
								followers[user].headline 
									= res.headlines[0].headline
							})

					let fetchAvatar = 
						resource('GET', 'avatars/' + user)
							.then(res => {
								followers[user].avatar = res.avatars[0].avatar
							})
					
					promiseList.push(fetchHeadline)
					promiseList.push(fetchAvatar)
				})
				// Update follower info when all avatars and headlines are
				// fetched.
				Promise.all(promiseList)
					.then(() => {
						dispatch(updateFollowers(followers))
					})
			})
	}
}
// Send followers info to redux store
export const updateFollowers = (followers) => { 
	return {type: "UPDATE_FOLLOWERS", followers}
}

export const addFollower = (user) => {
	return (dispatch) => {
		let url = "following/" + user
		resource('GET', "following")
			.then(r => {
				let following = r.following
				resource('PUT', url)
					.then(r => {
						if (following.length == r.following.length) {
							dispatch(
								updateErrorMsg("This user does not exist.")
							)
						} else {
							dispatch(fetchFollowers())
							dispatch(fetchArticles())
							dispatch(fetchAvatars())
						}
					})
				})
	}
}

export const deleteFollower = (user) => {
	return (dispatch) => {
		let url = "following/" + user
		resource('DELETE', url)
			.then(r => {
				dispatch(fetchFollowers())
				dispatch(fetchArticles())
				dispatch(fetchAvatars())
			})
	}
}