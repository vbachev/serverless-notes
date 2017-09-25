import React from 'react'
import { connect } from 'react-redux'
import { saveNote } from '../lib/actions'
import { push } from 'react-router-redux'

class CreateNote extends React.Component {
	constructor (props) {
		super(props)
		this.state = this.noteToState(props.note)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.handleContentChange = this.handleContentChange.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}

	componentWillReceiveProps (newProps) {
		this.setState(this.noteToState(newProps.note))
	}

	noteToState (note) {
		return note
			? {
					id: note.id,
					title: note.title,
					content: note.content
				}
			: {
					id: null,
					title: '',
					content: ''
				}
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

	handleCancel (e) {
		e.preventDefault()
		this.props.cancelForm(this.state.id ? ('/note/' + this.state.id) : '/')
	}

	canSave () {
		if (this.props.note) {
			return this.props.note.content !== this.state.content
				|| this.props.note.title !== this.state.title
		}
		return !!this.state.title
	}

	render () {
		return (
			<form onSubmit={this.handleSubmit} className='note-form-component'>
				<input name='title' type='text'
					className='form-field note-title'
					value={this.state.title}
					onChange={this.handleTitleChange} />
				<textarea name='content'
					className='form-field note-content'
					value={this.state.content}
					onChange={this.handleContentChange} />
				<div className='note-actions'>
					<button type='submit'
						className='note-action save'
						disabled={this.canSave() ? '' : 'disabled'}>
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
	return {
		note: state.notes.filter((note) => note.id === matchedNoteId)[0]
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