import { push } from 'react-router-redux'
import GSAPI from 'google-sheets-api'

export const IS_LOADING = 'IS_LOADING'
export const NOTES_LOADED = 'NOTES_LOADED'
export const NOTE_CREATED = 'NOTE_CREATED'
export const NOTE_EDITED = 'NOTE_EDITED'
export const NOTE_DELETED = 'NOTE_DELETED'

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

export const noteDeleted = (id) => ({
	type: NOTE_DELETED,
	id
})

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

export const deleteNote = (id) => {
	return (dispatch) => {
		dispatch(isLoading(true))
		dispatch(push('/'))
		dispatch(noteDeleted(id))

		getAPI((api) => {
			api.remove('notes', id, () => {})
		})
	}
}

class Note {
	constructor (noteData) {
		Object.assign(this, this.getBlank(), noteData)
	}

	fromRow (rowData, id) {
		Object.assign(this, this.getBlank(), {
			id: id,
			title: rowData[0],
			content: rowData[1],
			lastModified: rowData[2],
			deleted: rowData[3]
		})
		return this
	}

	toRow () {
		return [
			this.title,
			this.content,
			this.lastModified,
			this.deleted
		]
	}

	getBlank () {
		return {
			id: null,
			title: '',
			content: '',
			lastModified: '',
			deleted: 0
		}
	}

	updateLastModified () {
		this.lastModified = new Date().toISOString()
	}
}