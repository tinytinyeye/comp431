import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// A single follower
const Follower = ( { name, avatar, headline } ) => (
	<div>
		<img src={ avatar } className="img-circle center-block" 
            width="150px" height="150px"/>
    	<div className="container">
    		<h4>{ name }</h4>
    		<h6>{ headline }</h6>
    	</div>
    	<button className="btn btn-danger btn-block">Unfollow</button>
    	<div className="row">&nbsp;</div>
	</div>
)

Follower.PropTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    headline: PropTypes.string
}

// A list of followers
const Following = ( { followers } ) => {
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
                    name="newFriend"/>
                </div>
                <div className="col-sm-4 col-md-4">
                    <button className="btn btn-success">Add</button>
                </div>  
            </div>
    	</div>
    )
}

Following.PropTypes = {
    followers: PropTypes.object
}

export default connect((state) => {
    return {
        followers: state.following.followers
    }
})(Following)