import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../lib/actions'
import ContextMenu from './ContextMenu'

class SidebarHeader extends React.Component {
	renderGuestHeader () {
		return (
			<div className='profile-placeholder'>
				<div className='profile-image' />
				<button className='sign-in primary' onClick={this.props.signIn}>
					Sign-in with Google
				</button>
			</div>
		)
	}

	renderProfileHeader () {
		const { spreadsheet } = this.props
		const profile = this.props.profile || { name: 'Loading ...' }
		return (
			<div>
				<img className='profile-image'
					alt={profile.name}
					src={profile.image} />

				<div className='profile-text'>
					<div className='profile-name'>
						{profile.name}
					</div>
					<div className='profile-email'>
						{profile.email}
					</div>

					<ContextMenu>
						<a className='button profile-link primary'
							title='Open profile in Google Plus'
							href={'https://plus.google.com/' + profile.id}
							target='_blank' rel='noopener'>
							Google+
						</a>

						{spreadsheet &&
							<a className='button spreadsheet-link primary'
								title='Open spreadsheet in Google Drive'
								href={spreadsheet.url}
								target='_blank' rel='noopener'>
								Spreadsheet
							</a>
						}

						<button className='sign-out'
							title='Sign out of Google profile'
							onClick={this.props.signOut}>
							Sign-out
						</button>
					</ContextMenu>
				</div>
			</div>
		)
	}

	render () {
		const { isSignedIn } = this.props
		return (
			<div className='sidebar-header-component'>
				{isSignedIn
					? this.renderProfileHeader()
					: this.renderGuestHeader()
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isSignedIn: state.user.isSignedIn,
	profile: state.user.profile,
	spreadsheet: state.user.spreadsheet
})

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(actions.signIn()),
	signOut: () => dispatch(actions.signOut())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarHeader)