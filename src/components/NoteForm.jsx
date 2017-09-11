import React from 'react'
import { connect } from 'react-redux'
import { saveNote } from '../lib/actions'
import { push } from 'react-router-redux'

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
		this.handleCancel = this.handleCancel.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		if (!this.state.title) return
		this.props.saveNote(this.state)
	}

	handleTitleChange (e) {
		this.setState({ title: e.target.value })
	}

	handleContentChange (e) {
		this.setState({ content: e.target.value })
	}

	handleCancel () {
		this.props.cancelForm(this.state.id ? ('/note/' + this.state.id) : '/')
	}

	render () {
	 	return (
			<form onSubmit={this.handleSubmit} className='note-form-component'>
				<input className='form-field note-title' value={this.state.title} onChange={this.handleTitleChange} />
				<textarea className='form-field note-content' value={this.state.content} onChange={this.handleContentChange} />
				<div className='note-actions'>
					<button className='note-action save' type='submit'>
						Save
					</button>
					<button className='note-action cancel' onClick={this.handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		)
	}
}

const mapStateToProps = (state, props) => {
	const matchedNoteId = parseInt(props.match.params.id, 10)
	const matchedNote = state.notes.filter((note) => note.id === matchedNoteId)[0]
	return {
		note: matchedNote
	}
}

const mapDispatchToProps = (dispatch) => ({
	saveNote: (note) => dispatch(saveNote(note)),
	cancelForm: (path) => dispatch(push(path))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateNote)