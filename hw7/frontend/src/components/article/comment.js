import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { parseDate, updateComment } from './articleActions'

// A single comment

let Comment = ( { commentId, articleId, author, date, text, user, 
	updateComment } ) => {
	let commentNode
	return (
		<div>
			<strong>{ author } commented on { parseDate(date) }</strong><br/>
			<div contentEditable={ user === author ? true : false} ref={
	            (node) => commentNode = node
	        }>
				{ text }
			</div>
			{ 
				// If the author of a comment is the loggined user,
				// user can edit the comment.
				user === author ? 
	    		<button className="btn btn-info btn-sm" onClick={
	    			() => {
                        let i = articleId;
                        let c = commentId;
                        updateComment(commentNode.innerText, i, c)
                    }
	    		}>Edit</button> : null
	        }
			<div className="h-divider"></div>
		</div>
	)
}

Comment.PropTypes = {
	commentId: PropTypes.string,
	articleId: PropTypes.string,
	author: PropTypes.string,
	date: PropTypes.string,
	text: PropTypes.string,
	user: PropTypes.string,
	updateComment: PropTypes.function
}

Comment = connect(
    (state) => {return {
		user: state.profile.name
	}},
    (dispatch) => {return {
        updateComment: (t, i, c) => dispatch(updateComment(t, i, c))
    }}
)(Comment)

// A list of comments
const Comments = ( { comments, articleId } ) => (
	<div>
		{
			comments.map((comment) => (
				<Comment key={ comment.commentId }
						 commentId={ comment.commentId }
						 articleId={ articleId }
						 author={ comment.author }
						 date={ comment.date }
						 text={ comment.text }
				/>
			))
		}
	</div>
)



export { Comments }