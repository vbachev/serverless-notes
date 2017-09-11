import React from 'react'
import { Link } from 'react-router-dom'

const NotesList = props => {
  return (
    <div className='notes-list-component'>
      <div className='notes-list-header'>
        <h1>Notes</h1>
      </div>
      <ul className='notes-list'>
        {props.notes.map(note => (
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
    </div>
  )
}

export default NotesList
