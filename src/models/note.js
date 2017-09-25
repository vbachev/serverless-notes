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
			deleted: parseInt(rowData[3], 10)
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

export default Note