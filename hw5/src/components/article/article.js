import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { parseDate } from './articleActions'
import { Comments } from './comment'

const Article = ( { avatar, img, author, date, text, comments, user } ) => {
	let showComment = true
	return (
	<div className="col-sm-12 col-md-12 card">
		<div className="row">
        	<div className="col-sm-2 col-md-2">
        		<img src={ avatar } className="img-circle" 
					width="90px" height="90px"/>
        	</div>
        	<div className="col-sm-8 col-md-8">
        		<div className="row">&nbsp;</div>
        		<strong>{ author }</strong> 
        		<strong>posted { parseDate(date) }</strong>
        	</div>
        </div>
        <img src={ img } className="imgCard" width="80%"/>
        <div className="row">&nbsp;</div>
        <div>
			{ text }
		</div>
        <div className="row">&nbsp;</div>
		{ showComment ? <Comments comments={ comments }/> : null }
		<div className="row">&nbsp;</div>
        <div className="form-group">
        	{ user === author ? 
        		<button className="btn btn-info btn-block">Edit</button> :
        		null
        	}
			<button className="btn btn-success btn-block">Comment</button>
        </div>
    </div>
	)
}

Article.PropTypes = {
    avatar: PropTypes.string,
    img: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    comments: PropTypes.array,
    user: PropTypes.string
}

export default connect((state) => {
	return {
		user: state.profile.name
	}
})(Article)