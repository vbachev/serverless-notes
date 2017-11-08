import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../lib/actions'

class Home extends React.Component {
	render () {
		return (
			<div className='home-component card container'>
				<h2 className='card-header'>
					Ready to take notes?
				</h2>
				<p>This is a simple note-taking app with <em>no server or database</em>!</p>
				<p>It uses <b>Google Sheets API</b> to:</p>
				<ul>
					<li>Let you quickly manage notes from any device</li>
					<li>Store your notes securely in a spreadsheet you own</li>
					<li>Give you private access to your data</li>
				</ul>
				<p>In order to use it, you have sign-in with your Google account using the button below.</p>
				<p>
					<small>
						It will ask for permission to create and manage files in your Drive. The app will only have access to the spreadsheet it created.
						<br />
						If you are a first-time user, the app will create a new spreadsheet to host all your notes.
					</small>
				</p>
				<div className='card-footer'>
					<button className='action sign-in primary' onClick={this.props.signIn}>
						Sign-in with Google
					</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(actions.signIn())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)