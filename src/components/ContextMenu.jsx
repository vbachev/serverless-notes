import React from 'react'

class ContextMenu extends React.Component {
	constructor (props) {
		super(props)
		this.state = { open: false }
		this.triggerMenu = this.triggerMenu.bind(this)
		this.handleOutsideClick = this.handleOutsideClick.bind(this)
	}

	triggerMenu () {
		this.setState((oldState) => ({
			open: !oldState.open
		}), () => {
			if (this.state.open) this.setClickListener()
		})
	}

	setClickListener () {
		window.addEventListener('click', this.handleOutsideClick)
	}

	removeClickListener () {
		window.removeEventListener('click', this.handleOutsideClick)
	}

	handleOutsideClick (e) {
		if (!this.node.contains(e.target)) {
			this.setState({ open: false })
			this.removeClickListener()
		}
	}

	componentWillUnmount () {
		this.removeClickListener()
	}

	render () {
		return (
			<div className='context-menu-wrapper' ref={(node) => this.node = node}>
				<button onClick={this.triggerMenu} className='context-menu-button' >…</button>
				{this.state.open &&
					<div className='context-menu'>
						{this.props.children}
					</div>
				}
			</div>
		)
	}
}

export default ContextMenu