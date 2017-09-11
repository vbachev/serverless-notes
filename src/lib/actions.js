import { push } from 'react-router-redux'
import GSAPI from 'google-sheets-api'

export const IS_LOADING = 'IS_LOADING'
export const NOTES_LOADED = 'NOTES_LOADED'
export const NOTE_CREATED = 'NOTE_CREATED'
export const NOTE_EDITED = 'NOTE_EDITED'
export const NOTE_DELETED = 'NOTE_DELETED'

const getAPI = (() => {
	let api
	return (callback) => {
		if (api) return callback(api)
		api = GSAPI({
			clientId: '780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com',
			spreadsheetId: '1jaqCfROgm33Uvm4gnAu3c7ALLjXmO4Ijk-tc5YFAwho'
		}, () => api.signIn(() => callback(api)))
	}
})()

export const isLoading = (value) => ({
	type: IS_LOADING,
	value
})

export const notesLoaded = notes => ({
	type: NOTES_LOADED,
	notes
})

export const noteCreated = note => ({
	type: NOTE_CREATED,
	note
})

export const noteEdited = note => ({
	type: NOTE_EDITED,
	note
})

export const noteDeleted = id => ({
	type: NOTE_DELETED,
	id
})

export const loadNotes = () => {
	return (dispatch) => {
		dispatch(isLoading(true))

		getAPI((api) => {
			api.getAll('notes', (data) => {
				const notes = data.map((item, index) => ({
					id: index + 1, // sheet rows start from 1
					title: item[0],
					content: item[1]
				}))
				dispatch(notesLoaded(notes))
			})
		})
	}
}

export const createNote = (note) => {
	return (dispatch) => {
		dispatch(isLoading(true))
		if (note.id) dispatch(push('/note/' + note.id))
		getAPI((api) => {
			const rawNote = [note.title, note.content]
			if (note.id) {
				api.update('notes', note.id, rawNote, () => {
					dispatch(noteEdited(note))
				})
			} else {
				api.insert('notes', rawNote, (id) => {
					note.id = id
					dispatch(noteCreated(note))
					dispatch(push('/note/' + id))
				})
			}
		})
	}
}

export const deleteNote = (id) => {
	return (dispatch) => {
		dispatch(isLoading(true))
		dispatch(push('/'))
		getAPI((api) => {
			api.remove('notes', id, () => {
				dispatch(noteDeleted(id))
			})
		})
	}
}