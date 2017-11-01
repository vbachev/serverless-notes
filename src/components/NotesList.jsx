import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class NotesList extends React.Component {
  getLinkPath (id) {
    const path = this.props.filter === 'deleted' ? 'deleted' : 'note'
    return '/' + path + '/' + id
  }

  render () {
    const sortingMethod = (a, b) => a.lastModified < b.lastModified
    const filteringMethod = this.props.filter === 'deleted'
      ? (note) => !!note.deleted
      : (note) => !note.deleted
    const searchFilteringMethod = this.props.searchTerm
      ? (note) => note.title.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1
      : () => true
    const notes = this.props.notes.slice()
      .sort(sortingMethod)
      .filter(filteringMethod)
      .filter(searchFilteringMethod)
    return (
      <div className='notes-list-component container card'>
        <h2 className='notes-list-title card-header'>
        	Notes
        </h2>
        <ul className='notes-list'>
          {notes.map((note) => (
            <li key={note.id} className='notes-list-item'>
              {(this.props.openNoteId === note.id)
                ? (
                  <span className='note-teaser active'>
                    {note.title}
                  </span>
                )
                : (
                  <Link to={this.getLinkPath(note.id)} className='note-teaser'>
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
}

const mapStateToProps = (state, props) => ({
	notes: state.notes,
	openNoteId: parseInt(props.match.params.id, 10),
  filter: props.match.params[0],
  searchTerm: state.searchTerm
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotesList)
