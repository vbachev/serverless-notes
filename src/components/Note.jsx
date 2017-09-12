import React from 'react'
import { connect } from 'react-redux'
import { deleteNote } from '../lib/actions'
import { push } from 'react-router-redux'

class Note extends React.Component {
	constructor (props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleDelete () {
		if (!window.confirm('Are you sure?')) return
		this.props.deleteNote(this.props.id)
	}

	handleEdit () {
		this.props.editNote(this.props.id)
	}

	render () {
		return (
			<div className='note-component'>
				<h2 className='note-title'>
					{this.props.title}
				</h2>
				<p className='note-content'>
					{this.props.content}
				</p>
				<div className='note-actions'>
					<button className='note-action delete' onClick={this.handleDelete}>
						Delete
					</button>
					<button className='note-action edit' onClick={this.handleEdit}>
						Edit
					</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	const matchedNoteId = parseInt(props.match.params.id, 10) || null
	const matchedNote = state.notes.filter((note) => note.id === matchedNoteId)[0]
	return {...matchedNote}
}

const mapDispatchToProps = (dispatch) => ({
	deleteNote: (id) => dispatch(deleteNote(id)),
	editNote: (id) => dispatch(push('/edit/' + id))
})

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Note)