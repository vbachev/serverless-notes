import React from 'react'
import {Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../lib/actions'
import ConnectedHome from './ConnectedHome'
import CreateNote from './CreateNote'
import About from './About'

class App extends React.Component {
	componentWillMount () {
		this.props.loadNotes()
	}

	render () {
		return (
			<div className="app">
				<header>
					<Link to='/'>Notes</Link>
					<Link to='/create'>Create note</Link>
					<Link to='/about'>About</Link>
				</header>
				<main>
					<Route path='/' component={ConnectedHome} exact />
					<Route path='/note/:id' component={ConnectedHome}/>
					<Route path='/create' component={CreateNote} exact />
					<Route path='/edit/:id' component={CreateNote} exact />
					<Route path='/about' component={About} exact />
				</main>
			</div>
		)
	}
}

export default withRouter(connect(
	(state) => ({}),
	(dispatch) => ({
		loadNotes: () => dispatch(actions.loadNotes())
	})
)(App))
