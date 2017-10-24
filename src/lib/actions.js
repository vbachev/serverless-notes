import { push } from 'react-router-redux'
import GSAPI from 'google-sheets-api'
import Note from '../models/note'

export const IS_LOADING = 'IS_LOADING'
export const NOTES_LOADED = 'NOTES_LOADED'
export const NOTE_CREATED = 'NOTE_CREATED'
export const NOTE_EDITED = 'NOTE_EDITED'
export const SEARCH_CHANGED = 'SEARCH_CHANGED'
export const IS_SIGNED_IN = 'IS_SIGNED_IN'

export const isLoading = (value) => ({
	type: IS_LOADING,
	value
})

export const notesLoaded = (notes) => ({
	type: NOTES_LOADED,
	notes
})

export const noteCreated = (note) => ({
	type: NOTE_CREATED,
	note
})

export const noteEdited = (note) => ({
	type: NOTE_EDITED,
	note
})

export const searchChanged = (searchTerm) => ({
	type: SEARCH_CHANGED,
	searchTerm
})

export const isSignedIn = (value) => ({
	type: IS_SIGNED_IN,
	value
})

const getAPI = (() => {
	let api
	return (callback) => {
		if (api) return callback(api)
		var clientId = '780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com'
		var spreadsheetId = '1jaqCfROgm33Uvm4gnAu3c7ALLjXmO4Ijk-tc5YFAwho'
		api = GSAPI(clientId, () => {
			api.setSpreadsheetId(spreadsheetId)
			callback(api)
		})
	}
})()

export const initGoogleAPI = () => {
	return (dispatch) => {
		getAPI((api) => {
			dispatch(isLoading(false))
			const signedIn = api.isSignedIn()
			dispatch(isSignedIn(signedIn))
			if (signedIn) {
				dispatch(loadNotes())
			} else {
				dispatch(push('/'))
			}
		})
	}
}

export const signIn = () => {
	return (dispatch) => {
		getAPI((api) => {
			api.signIn((signedIn) => {
				dispatch(isSignedIn(signedIn))
				if (signedIn) dispatch(loadNotes())
			})
		})
	}
}

export const signOut = () => {
	return (dispatch) => {
		getAPI((api) => {
			api.signOut()
			dispatch(isSignedIn(false))
			dispatch(notesLoaded([]))
		})
	}
}

export const loadNotes = () => {
	return (dispatch) => {
		dispatch(isLoading(true))

		getAPI((api) => {
			api.getAll('notes', (data) => {
				const notes = data.map((item, index) => {
					// sheet rows start from 1
					return new Note().fromRow(item, index + 1)
				})
				dispatch(notesLoaded(notes))
			})
		})
	}
}

export const saveNote = (noteData) => {
	return (dispatch) => {
		const note = new Note(noteData)
		note.updateLastModified()
		dispatch(isLoading(true))

		getAPI((api) => {
			if (note.id) {
				dispatch(push('/note/' + note.id))
				dispatch(noteEdited(note))
				api.update('notes', note.id, note.toRow(), () => {})
			} else {
				api.insert('notes', note.toRow(), (id) => {
					note.id = id
					dispatch(noteCreated(note))
					dispatch(push('/note/' + id))
				})
			}
		})
	}
}

export const deleteNote = (note) => {
	return (dispatch) => {
		note.updateLastModified()
		note.deleted = 1
		dispatch(push('/'))

		getAPI((api) => {
			api.update('notes', note.id, note.toRow(), () => {})
		})
	}
}

export const restoreNote = (note) => {
	return (dispatch) => {
		note.updateLastModified()
		note.deleted = 0
		dispatch(push('/'))

		getAPI((api) => {
			api.update('notes', note.id, note.toRow(), () => {})
		})
	}
}