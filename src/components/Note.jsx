import React from 'react'
import { connect } from 'react-redux'
import { deleteNote, restoreNote } from '../lib/actions'
import { push } from 'react-router-redux'

class Note extends React.Component {
	constructor (props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleRestore = this.handleRestore.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleDelete () {
		if (!window.confirm('Are you sure?')) return
		this.props.deleteNote(this.props.note)
	}

	handleRestore () {
		this.props.restoreNote(this.props.note)
	}

	handleEdit () {
		this.props.editNote(this.props.note.id)
	}

	render () {
		const note = this.props.note || {}
		return (
			<div className='note-component'>
				<h2 className='note-title'>
					{note.title}
				</h2>
				<p className='note-content'>
					{note.content}
				</p>
				<div className='note-actions'>
					{note.deleted
						? (
							<button className='note-action restore' onClick={this.handleRestore}>
								Restore
							</button>
						)
						: (
							<button className='note-action delete' onClick={this.handleDelete}>
								Delete
							</button>
						)
					}
					{!note.deleted &&
						<button className='note-action edit' onClick={this.handleEdit}>
							Edit
						</button>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	const matchedNoteId = parseInt(props.match.params.id, 10) || null
	const matchedNote = state.notes.filter((note) => note.id === matchedNoteId)[0]
	return {
		note: matchedNote
	}
}

const mapDispatchToProps = (dispatch) => ({
	deleteNote: (note) => dispatch(deleteNote(note)),
	restoreNote: (note) => dispatch(restoreNote(note)),
	editNote: (id) => dispatch(push('/edit/' + id))
})

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Note)