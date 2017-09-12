import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../lib/actions'
import NoteForm from './NoteForm'
import NotesList from './NotesList'
import Note from './Note'

class App extends React.Component {
	componentWillMount () {
		this.props.loadNotes()
	}

	render () {
		return (
			<div className="app-component">
				<main className='app-main'>
					<Route path='/(create|edit)/:id?' component={NoteForm} exact />
					<Route path='/note/:id' component={Note} exact />
				</main>
				<aside className='app-sidebar'>
		      <div className='sidebar-header'>
		        <h1>
							<Link to='/'>Notes</Link>
						</h1>
						<Link to='/create'>Create note</Link>
		      </div>
					<Route path='/($|note|create|edit)?/:id?' component={NotesList} exact />
				</aside>
			</div>
		)
	}
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

const mapDispatchToProps = (dispatch) => ({
	loadNotes: () => dispatch(actions.loadNotes())
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App))
