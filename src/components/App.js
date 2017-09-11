import React from 'react'
import {Route, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../lib/actions'
import Home from './Home'
import CreateNote from './CreateNote'
import About from './About'

class App extends React.Component {
	componentWillMount () {
		this.props.loadNotes()
	}

	render () {
		return (
			<div className="app">
				<header className='app-header'>
					<Link to='/'>Notes</Link>
					<Link to='/create'>Create note</Link>
					<Link to='/about'>About</Link>
				</header>
				<div className='app-body'>
					<Route path='/' component={Home} exact />
					<Route path='/note/:id' component={Home}/>
					<Route path='/create' component={CreateNote} exact />
					<Route path='/edit/:id' component={CreateNote} exact />
					<Route path='/about' component={About} exact />
				</div>
				<footer className='app-footer'>@Footer</footer>
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
