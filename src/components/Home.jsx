import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../lib/actions'

class Home extends React.Component {
	renderGuestPage () {
		return (
			<div className='home-component card container'>
				<h2 className='card-header'>
					Ready to take notes?
				</h2>
				<p>This is a simple note-taking app with no server or database!</p>
				<p>It uses Google Sheets API to:</p>
				<ul>
					<li>Read and write notes to a Google spreadsheet you own</li>
					<li>Give you quick access to your notes</li>
					<li>Keep your notes private and secure</li>
				</ul>
				<p>In order to use it, you have to click the button below and sign-in.</p>
				<p>
					<small>
						This will give the app access your Google Drive spreadsheets. Don't worry - it will only read and write to a spreadsheet you provide in the next step.
					</small>
				</p>
				<div className='card-footer'>
					<button className='action sign-in' onClick={this.props.signIn}>
						Sign-in with Google
					</button>
				</div>
			</div>
		)
	}

	renderUserPage () {
		return (
			<div className='home-component card container'>
				<h2 className='card-header'>
					Welcome back!
				</h2>
				<p>You are now logged in as:</p>
				<ul>
					<li>{this.props.user.name}</li>
					<li>{this.props.user.email}</li>
					<li><img alt={this.props.user.name} src={this.props.user.image} /></li>
				</ul>
				<div className='card-footer'>
					<button className='action sign-out' onClick={this.props.signOut}>
						Sign-out
					</button>
				</div>
			</div>
		)
	}

	render () {
		if (this.props.user.isSignedIn) {
			return this.renderUserPage()
		} else {
			return this.renderGuestPage()
		}
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(actions.signIn()),
	signOut: () => dispatch(actions.signOut())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)