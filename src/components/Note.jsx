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
		this.props.deleteNote(this.props.id)
	}

	handleEdit () {
		this.props.editNote(this.props.id)
	}

	render () {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>{this.props.content}</p>
				<button onClick={this.handleDelete}>Delete</button>
				<button onClick={this.handleEdit}>Edit</button>
			</div>
		)
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		deleteNote: (id) => dispatch(deleteNote(id)),
		editNote: (id) => dispatch(push('/edit/' + id))
	})
)(Note)