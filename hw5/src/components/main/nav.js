import React from 'react'
import { connect } from 'react-redux'
import Headline from './headline'
import Following from './following'
import { navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

// Navigation area in main page. Allows user to logout and jump
// to profile page.
const Nav = ( { logout, navToProfile } ) => (

	<div className="row">
		<div className="col-sm-12 col-md-12">
			<div className="row">&nbsp;</div>
			<div className="row">
				<div className="col-sm-6 col-md-6">
					<button className="btn btn-danger btn-block" id="btnLogout" 
						onClick={() => logout()}>
						<span className="glyphicon glyphicon-log-out"></span> Logout
					</button>
				</div>
				<div className="col-sm-6 col-md-6">
					<button className="btn btn-info btn-block" id="btnProfile"
						onClick={() => navToProfile()}>
						<span className="glyphicon glyphicon-user"></span> Profile
					</button>
				</div>
			</div>
			<Headline />
			<Following />
		</div>
	</div>
)

export default connect(null, (dispatch) => {
	return {
		logout: () => dispatch(logout()),
		navToProfile: () => dispatch(navToProfile())
	}
})(Nav)