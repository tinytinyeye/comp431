import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addFollower, deleteFollower } from './followingActions'
import { AlertMsg } from '../auth/landing'

// A single follower
let Follower = ( { name, avatar, headline, deleteFollower } ) => (
	<div className="follower">
		<img src={ avatar } className="img-circle center-block" 
            width="150px" height="150px"/>
    	<div className="container">
    		<h4>{ name }</h4>
    		<h6>{ headline }</h6>
    	</div>
    	<button name={ name } className="btn btn-danger btn-block" 
        onClick={
            () => {
                let f = name
                deleteFollower(f)
            }
        }>Unfollow</button>
    	<div className="row">&nbsp;</div>
	</div>
)

Follower.PropTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    deleteFollower: PropTypes.function
}

Follower = connect(null, (dispatch) => {
    return {
        deleteFollower: (f) => dispatch(deleteFollower(f))
    }}
)(Follower)

// A list of followers
const Following = ( { followers, addFollower } ) => {
    let newFollowerNode
    return (
    	<div className="col-sm-12 col-md-12">
    		<div className="row">&nbsp;</div>
    		<div className="h-divider"></div>
            {
                // Map each username to an object that contains name,
                // avatar and headline, and render each object to a 
                // component.
                Object.keys(followers)
                   .map((user) => followers[user])
                   .map((follower) => (
                        <Follower key={follower.name} name={follower.name}
                        avatar={follower.avatar} headline={follower.headline}/>
                ))
            }
            <div className="row">
                <div className="col-sm-8 col-md-8">
                    <input className="form-control" type="text" 
                    name="newFriend" id="newFriend"
                    ref={(node) => newFollowerNode = node}/>
                </div>
                <div className="col-sm-4 col-md-4">
                    <button className="btn btn-success" id="btnAdd" onClick={
                        () => {
                            addFollower(newFollowerNode.value)
                            newFollowerNode.value = ""
                        }
                    }>Add</button>
                </div>
                <AlertMsg/>
            </div>
    	</div>
    )
}

Following.PropTypes = {
    followers: PropTypes.object,
    addFollower: PropTypes.function
}

export default connect(
    (state) => {return {
        followers: state.following.followers
    }},
    (dispatch) => {return {
        addFollower: (f) => dispatch(addFollower(f))
    }}
)(Following)