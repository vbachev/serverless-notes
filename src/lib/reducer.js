import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {NOTE_DELETED, IS_LOADING, NOTES_LOADED, NOTE_CREATED, NOTE_EDITED} from './actions'

function notesReducer(state = [], action) {
	switch (action.type) {
		case NOTES_LOADED:
			return action.notes
		case NOTE_CREATED:
			return state.slice().concat(action.note)
		case NOTE_EDITED:
			return state.slice().map((note) => note.id === action.note.id ? action.note : note)
		case NOTE_DELETED:
			return state.slice().filter((note) => note.id !== action.id)
    default:
      return state
  }
}

function isLoadingReducer(state = true, action) {
	switch (action.type) {
		case IS_LOADING:
			return action.value
		case NOTES_LOADED:
		case NOTE_CREATED:
		case NOTE_EDITED:
		case NOTE_DELETED:
			return false
		default:
			return state
	}
}

export default combineReducers({
  routing: routerReducer,
  notes: notesReducer,
	isLoading: isLoadingReducer
})