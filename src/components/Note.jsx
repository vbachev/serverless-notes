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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
	deleteNote: (id) => dispatch(deleteNote(id)),
	editNote: (id) => dispatch(push('/edit/' + id))
})

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Note)