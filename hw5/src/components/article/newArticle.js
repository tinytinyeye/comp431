import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addArticle } from './articleActions'

// Area for writing new article
export const NewArticle = ( { addArticle } ) => {
	let newArticle = ""
	return (
		<div className="col-sm-12 col-md-12">
			<div className="row">
				<div className="col-sm-2 col-md-2">
					<input type="file" name="file" id="file" 
					className="inputfile" />
					<label htmlFor="file" className="btn btn-info btn-lg" 
					id="imgUpload">
	  					<span className="glyphicon glyphicon-camera"></span>
					</label>
				</div>
				<div className="col-sm-10 col-md-10">
					<div className="form-group" id="postInput">
						<textarea className="form-control" rows="2" 
						id="post" ref={(node) => newArticle = node}></textarea>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6 col-md-6">
					<div className="form-group">
  						<input type="button" 
  						className="btn btn-warning btn-block" 
  						value="Cancel" id="btnCancel"/>
					</div>
				</div>
				<div className="col-sm-6 col-md-6">
					<div className="form-group">
  						<input type="button" 
  						className="btn btn-success btn-block" 
  						value="Post" id="btnPost" onClick={
  						() => addArticle(newArticle.value)}/>
					</div>	
				</div>							
			</div>
		</div>
	)
}

export default connect(null, (dispatch) => {
	return {
		addArticle: (value) => dispatch(addArticle(value))
	}
})(NewArticle)