import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { parseDate, updateArticle, updateComment } from './articleActions'
import { Comments } from './comment'

// A single article for display. User is the current username
const Article = ({ id, avatar, img, author, date, text, 
    comments, user, updateArticle, updateComment }) => {
	let showComment = true
    let textNode
    let commentNode
	return (
	<div className="col-sm-12 col-md-12 card">
		<div className="row">
        	<div className="col-sm-2 col-md-2">
        		<img src={ avatar } className="img-circle" 
					width="90px" height="90px"/>
        	</div>
        	<div className="col-sm-8 col-md-8">
        		<div className="row">&nbsp;</div>
        		<strong className="author">{ author }</strong> 
        		<strong>posted { parseDate(date) }</strong>
        	</div>
        </div>
        <img src={ img } className="imgCard" width="80%"/>
        <div className="row">&nbsp;</div>
        <div name="article" contentEditable={ user === author ? true : false} 
        ref={(node) => textNode = node}>
			{ text }
		</div>
        <div className="row">&nbsp;</div>
        <div className="form-group">
            { 
                // If the author of a article is the loggined user,
                // user can edit the article.
                user === author ? 
                <button name="edit" 
                className="btn btn-info btn-block" onClick={
                    () => {
                        let i = id;
                        updateArticle(textNode.innerText, i)
                    }
                }>Edit</button> :
                null
            }
        </div>
		{ showComment ? 
            <Comments comments={ comments } articleId={ id }/> : null }
        <div className="form-group">
            <input type="text" className="form-control input-md" 
                placeholder="Comment here" 
                ref={(node) => commentNode = node}/>
            <div className="h-divider"></div>    
			<button className="btn btn-success btn-block" onClick={
                () => {
                    let i = id
                    updateComment(commentNode.value, i, -1)
                    commentNode.value = ""
                }
            }>Comment</button>
        </div>
    </div>
	)
}

Article.PropTypes = {
    id: PropTypes.string,
    avatar: PropTypes.string,
    img: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    comments: PropTypes.array,
    user: PropTypes.string,
    updateArticle: PropTypes.function
}

export default connect(
    (state) => {return {
		user: state.profile.name
	}},
    (dispatch) => {return {
        updateArticle: (t, i) => dispatch(updateArticle(t, i)),
        updateComment: (t, i, c) => dispatch(updateComment(t, i, c))
    }}
)(Article)