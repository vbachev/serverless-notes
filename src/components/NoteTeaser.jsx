import React from 'react'
import { Link } from 'react-router-dom'

class NoteTeaser extends React.Component {
	render () {
		const { note } = this.props

		const ellipsis = '...'
		const limit = 100
		let summary = note.content.substring(0, limit)
		if (note.content.length > (limit - ellipsis.length)) {
			summary += ellipsis
		}

		return (
			<Link to={'/note/' + note.id} className='note-teaser'>
				<h4 className='teaser-title'>
					{note.title}
				</h4>
				<span className='teaser-last-modified'>
					{new Date(note.lastModified).toLocaleDateString()}
				</span>
				<p className='teaser-summary'>
					{summary}
				</p>
			</Link>
		)
	}
}

export default NoteTeaser