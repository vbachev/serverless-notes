import React from 'react'
import NotesList from './NotesList'
import Note from './Note'

const Home = (props) => {
	if (props.isLoading) {
		return (
			<p>LOADING NOTES</p>
		)
	}

	return (
		<div>
			<NotesList notes={props.notes} openNoteId={props.note ? props.note.id : null} />
			{props.note && (
				<Note {...props.note} />
			)}
		</div>
	)
}

export default Home