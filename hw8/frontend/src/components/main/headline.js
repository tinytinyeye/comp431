import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeHeadline } from '../profile/profileActions'

// Display area for user headline. Also contains username and avatar,
// and an area for headline update
const Headline = ( { name, avatar, headline, changeHeadline } ) => {
	let newHeadline = ''
	return (
		<div className="col-sm-12 col-md-12">
			<img src={ avatar } className="img-circle center-block" 
				width="150px" height="150px"/>
			<div className="container">
				<h3>{ name }</h3>
				<h5 id="status">{ headline }</h5>
			</div>
			<div className="row">&nbsp;</div>
			<div className="form-group" id="statusUpdate">
				<textarea className="form-control" rows="2" id="txtStatus" 
				placeholder="Write your thoughts"
				ref={(node) => newHeadline = node}></textarea>
			</div>
			<button className="btn btn-info btn-block" id="btnUpdate" 
				onClick={(e) => {
					if (newHeadline !== "") {
						changeHeadline(name, newHeadline.value)
						newHeadline.value = ""
					}
			}}>Update</button>
		</div>

	)
}

Headline.PropTypes = {
	name: PropTypes.string,
	avatar: PropTypes.string,
	headline: PropTypes.string,
	changeHeadline: PropTypes.function
}

export default connect(
	(state) => {return { 
		name: state.profile.name,
		avatar: state.profile.avatar,
		headline: state.profile.headline 
	}},
	(dispatch) => {return {
		changeHeadline: (name, value) => dispatch(changeHeadline(name, value))
	}}
)(Headline)