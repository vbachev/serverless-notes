import React from 'react'
import { connect } from 'react-redux'
import NotesList from './NotesList'
import Note from './Note'

const Home = (props) => {
	return (
		<div className='home-component'>
			<aside>
				<NotesList notes={props.notes} openNoteId={props.note ? props.note.id : null} />
			</aside>
			<main>
				{props.isLoading &&
					<div>
						LOADING NOTES
					</div>
				}
				{props.note &&
					<Note {...props.note} />
				}
			</main>
		</div>
	)
}

const mapStateToProps = (state, props) => {
	const matchedNoteId = parseInt(props.match.params.id, 10) || null
	const matchedNote = state.notes.filter((note) => note.id === matchedNoteId)[0]
	return {
		isLoading: state.isLoading,
		notes: state.notes,
		note: matchedNote || null
	}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)