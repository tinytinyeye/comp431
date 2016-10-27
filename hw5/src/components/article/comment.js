import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { parseDate } from './articleActions'

// A single comment
const Comment = ( { commentId, author, date, text } ) => (
	<div>
		<strong>{ author } commented on { parseDate(date) }</strong><br/>
		{ text }
		<div className="h-divider"></div>
	</div>
)

Comment.PropTypes = {
	commentId: PropTypes.string,
	author: PropTypes.string,
	date: PropTypes.string,
	text: PropTypes.string
}

// A list of comments
const Comments = ( { comments } ) => (
	<div>
		{
			comments.map((comment) => (
				<Comment key={ comment.commentId }
						 commentId={ comment.commentId }
						 author={ comment.author }
						 date={ comment.date }
						 text={ comment.text }
				/>
			))
		}
	</div>
)

export { Comments }