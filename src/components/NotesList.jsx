import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const NotesList = (props) => {
  const sortingMethod = (a, b) => a.lastModified < b.lastModified
  const filteringMethod = props.filter === 'deleted'
    ? (note) => !!note.deleted
    : (note) => !note.deleted
  const notes = props.notes.sort(sortingMethod).filter(filteringMethod)
  const path = props.filter === 'deleted' ? 'deleted' : 'note'
  return (
    <ul className='notes-list-component'>
      {notes.map((note) => (
        <li key={note.id} className='notes-list-item'>
          {(props.openNoteId === note.id)
            ? (
              <span className='note-teaser active'>
                {note.title}
              </span>
            )
            : (
              <Link to={'/' + path + '/' + note.id} className='note-teaser'>
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
	openNoteId: parseInt(props.match.params.id, 10),
  filter: props.match.params[0]
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotesList)
