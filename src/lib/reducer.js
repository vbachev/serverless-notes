import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { SEARCH_CHANGED, IS_LOADING, NOTES_LOADED, NOTE_CREATED, NOTE_EDITED, IS_SIGNED_IN } from './actions'

function notesReducer (state = [], action) {
	switch (action.type) {
		case NOTES_LOADED:
			return action.notes
		case NOTE_CREATED:
			return state.slice().concat(action.note)
		case NOTE_EDITED:
			return state.slice().map((note) => note.id === action.note.id ? action.note : note)
    default:
      return state
  }
}

function isLoadingReducer (state = true, action) {
	switch (action.type) {
		case IS_LOADING:
			return action.value
		case NOTES_LOADED:
		case NOTE_CREATED:
		case NOTE_EDITED:
			return false
		default:
			return state
	}
}

function isSignedInReducer (state = false, action) {
	switch (action.type) {
		case IS_SIGNED_IN:
			return action.value
		default:
			return state
	}
}

function searchTermReducer (state = null, action) {
	switch (action.type) {
		case SEARCH_CHANGED:
			return action.searchTerm
		default:
			return state
	}
}

export default combineReducers({
  routing: routerReducer,
  notes: notesReducer,
	isLoading: isLoadingReducer,
	isSignedIn: isSignedInReducer,
	searchTerm: searchTermReducer
})