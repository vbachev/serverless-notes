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
		const classes = 'app-component' + (this.props.isLoading ? ' loading' : '')
		return (
			<div className={classes}>
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

const mapStateToProps = (state) => ({
	isLoading: state.isLoading
})

const mapDispatchToProps = (dispatch) => ({
	loadNotes: () => dispatch(actions.loadNotes())
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App))
