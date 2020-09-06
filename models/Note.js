const { Schema, model } = require('mongoose')

const schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	note: {
		type: String,
		required: true,
	},
	isCompleted: Boolean,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

const Note = model('Note', schema)

module.exports = Note
