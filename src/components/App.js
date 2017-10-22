import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../lib/actions'
import { debounce } from '../lib/utils'
import NoteForm from './NoteForm'
import NotesList from './NotesList'
import Note from './Note'

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = { searchTerm: '' }
		this.handleSearchChange = this.handleSearchChange.bind(this)
		this.dispatchSearchChange = debounce(this.dispatchSearchChange.bind(this), 300)
	}

	componentWillMount () {
		this.props.loadNotes()
	}

	handleSearchChange (e) {
		this.setState({ searchTerm: e.target.value }, this.dispatchSearchChange)
	}

	dispatchSearchChange () {
		this.props.searchChanged(this.state.searchTerm)
	}

	render () {
		const classes = 'app-component' + (this.props.isLoading ? ' loading' : '')
		return (
			<div className={classes}>
				<header className='app-header'>
					<div className='container'>
						<h1 className='app-title'>
							Yet another notes app
						</h1>
					</div>
				</header>
				<main className='app-main'>
					<Route path='/(create|edit)/:id?' component={NoteForm} exact />
					<Route path='/(note|deleted)/:id' component={Note} exact />
				</main>
				<aside className='app-sidebar'>
					<div className='sidebar-header'>
						<Link to='/'>Notes</Link>
						<Link to='/deleted'>Deleted notes</Link>
						<Link to='/create'>Create note [+]</Link>
						<input type='text' name='search'
							className='sidebar-search'
						 	placeholder='Search'
							onChange={this.handleSearchChange} />
					</div>
					<Route path='/($|note|create|edit|deleted)?/:id?' component={NotesList} exact />
				</aside>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.isLoading
})

const mapDispatchToProps = (dispatch) => ({
	loadNotes: () => dispatch(actions.loadNotes()),
	searchChanged: (searchTerm) => dispatch(actions.searchChanged(searchTerm))
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App))
