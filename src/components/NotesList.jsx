import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const NotesList = (props) => {
  const sortedNotes = props.notes.sort((a, b) => a.lastModified < b.lastModified)
  return (
    <ul className='notes-list-component'>
      {sortedNotes.map((note) => (
        <li key={note.id} className='notes-list-item'>
          {(props.openNoteId === note.id)
            ? (
              <span className='note-teaser active'>
                {note.title}
              </span>
            )
            : (
              <Link to={'/note/' + note.id} className='note-teaser'>
                {note.title}
              </Link>
            )
          }
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = (state, props) => ({
	notes: state.notes,
	openNoteId: parseInt(props.match.params.id, 10)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotesList)
