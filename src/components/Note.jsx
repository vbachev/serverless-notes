import React from 'react'
import { connect } from 'react-redux'
import { deleteNote, restoreNote } from '../lib/actions'
import { push } from 'react-router-redux'
import ContextMenu from './ContextMenu'

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
			<div className='note-component container card'>
				<div className='card-header'>
					<ContextMenu>
						{note.deleted
							? (
								<button className='note-action restore'
									onClick={this.handleRestore}>
									Restore
								</button>
							)
							: [
								<button className='note-action edit primary'
									onClick={this.handleEdit} key='0'>
									Edit
								</button>,
								<button className='note-action delete'
									onClick={this.handleDelete} key='1'>
									Delete
								</button>
							]
						}
					</ContextMenu>
					<h2 className='card-title'>
						{note.title}
					</h2>
				</div>
				<p className='note-content'>
					{note.content}
				</p>
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