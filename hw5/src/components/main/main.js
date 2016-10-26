import React from 'react'

import ArticlesView from '../article/articlesView'
import Nav from './nav'

// Main page of the website
const Main = () => {
	return(
		<div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <ArticlesView />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4">
                    <Nav />
                </div>
            </div>
		</div>
	)	
}

export default Main