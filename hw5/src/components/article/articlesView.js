import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import NewArticle from './newArticle'
import Article from './article'
import { updateKeyword, sortByDate, filterByKeyword } from './articleActions'

// Display articles, include a search area.
export const ArticlesView = ({ articles, avatars, keyword, 
	updateKeyword }) => {
	let kw
	return (
		<div className="row">
			<NewArticle />
			<div className="col-sm-12 col-md-12" id="searchBg">
				<input type="text" className="form-control input-lg" 
				id="searchFld" placeholder="Search for users or articles" 
				ref={(node) => kw = node} 
				onChange={() => updateKeyword(kw.value)}/>
			</div>
			{
				// First map each id to the corresponding article,
				// filter the articles by keyword input, and then
				// sort the articles by dates and finally render each
				// article object to an article component
				Object.keys(articles)
					.map((id) => articles[id])
					.filter((article) => filterByKeyword(article, keyword))
					.sort(sortByDate)
					.map((article) => 
						(
						<Article key={ article._id } 
							  author={ article.author } 
							  date={ article.date } 
							  img={ article.img } 
        					  text={ article.text } 
        					  avatar={ avatars[article.author]}
        					  comments={ article.comments }/> 
            			))
            }
		</div>
	)
}

ArticlesView.PropTypes = {
    articles: PropTypes.object,
    avatars: PropTypes.object,
    keyword: PropTypes.string,
    updateKeyword: PropTypes.function
}

export default connect(
	(state) => {return {
        articles: state.articles.articles,
        avatars: state.articles.avatars,
        keyword: state.articles.keyword
    }},
    (dispatch) => {return {
    	updateKeyword: (kw) => dispatch(updateKeyword(kw))
    }}
)(ArticlesView)