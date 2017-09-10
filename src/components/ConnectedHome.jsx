import { connect } from 'react-redux'
import Home from './Home'

const mapStateToProps = (state, props) => {
	const matchedNoteId = props.match.params.id ? parseInt(props.match.params.id, 10) : null
	const matchedNote = state.notes.filter(note => note.id === matchedNoteId)[0]
	return {
		isLoading: state.isLoading,
		notes: state.notes,
		note: matchedNote || null
	}
}

const mapDispatchToProps = dispatch => ({
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)