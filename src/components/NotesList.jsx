import React from 'react'
import { connect } from 'react-redux'
import NoteTeaser from './NoteTeaser'
import ContextMenu from './ContextMenu'

class NotesList extends React.Component {
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
        <div className='card-header'>
					<ContextMenu>
					</ContextMenu>
          <h2 className='card-title'>
          	Notes
          </h2>
        </div>
        <ul className='notes-list'>
          {notes.map((note) => (
            <li key={note.id} className='notes-list-item'>
              <NoteTeaser note={note} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
	notes: state.notes,
  filter: props.match.params[0],
  searchTerm: state.searchTerm
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotesList)
