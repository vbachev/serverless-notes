import React from 'react'

class Profile extends React.Component {
	render () {
		return (
			<a className='tile profile-tile'
				title='Open profile in Google Plus'
				href={'https://plus.google.com/' + this.props.id}
				target='_blank' rel='noopener'>
				<img className='profile-image' alt={this.props.name} src={this.props.image} />
				<div className='profile-name'>
					{this.props.name}
				</div>
				<div className='profile-email'>
					{this.props.email}
				</div>
			</a>
		)
	}
}

export default Profile