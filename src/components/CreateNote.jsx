import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../lib/actions'

class CreateNote extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			id: props.note ? props.note.id : null,
			title: props.note ? props.note.title : '',
			content: props.note ? props.note.content : ''
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.handleContentChange = this.handleContentChange.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		if (!this.state.title) return
		this.props.createNote(this.state)
	}

	handleTitleChange (e) {
		this.setState({ title: e.target.value })
	}

	handleContentChange (e) {
		this.setState({ content: e.target.value })
	}

	render () {
	 	return (
			<form onSubmit={this.handleSubmit}>
				<input value={this.state.title} onChange={this.handleTitleChange} />
				<textarea value={this.state.content} onChange={this.handleContentChange} />
				<button type='submit'>
					Save
				</button>
			</form>
		)
	}
}

export default connect(
	(state, props) => {
		const matchedNoteId = parseInt(props.match.params.id, 10)
		const matchedNote = state.notes.filter(note => note.id === matchedNoteId)[0]
		return {
			note: matchedNote
		}
	},
	(dispatch) => ({
		createNote: note => dispatch(createNote(note))
	})
)(CreateNote)