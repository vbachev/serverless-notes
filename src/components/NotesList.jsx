import React from 'react'
import { Link } from 'react-router-dom'

const NotesList = props => {
  return (
    <ul>
      {props.notes.map(note => (
        <li key={note.id} className='notes-list-item'>
          {(props.openNoteId === note.id)
            ? (
              <span>
                {note.title}
              </span>
            )
            : (
              <Link to={'/note/' + note.id}>
                {note.title}
              </Link>
            )
          }
        </li>
      ))}
    </ul>
  )
}

export default NotesList
