import React from 'react'

class Document extends React.Component {
	render () {
		return (
			<a className='tile document-tile'
				title='Open spreadsheet in Google Drive'
				href={this.props.url}
				target='_blank' rel='noopener'>
				<span className='document-title'>
					{this.props.title}
				</span>
			</a>
		)
	}
}

export default Document