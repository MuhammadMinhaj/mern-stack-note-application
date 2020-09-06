const Note = require('../../models/Note')

exports.getAllNoteItemGetController = async (req, res, next) => {
	try {
		const notes = await Note.find()
		console.log(notes)
		if (!notes) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(200).json({ notes })
	} catch (e) {
		next(e)
	}
}

exports.createNotePostController = async (req, res, next) => {
	try {
		const { title, note } = req.body

		let error = ''

		if (!title) {
			error = 'Invalid Creadentials'
		}
		if (!note) {
			error = 'Invalid Creadentials'
		}
		if (error) {
			return res.status(400).json({ message: error })
		}
		const createNote = new Note({
			title,
			note,
			isRunning: false,
			isCompleted: false,
			createdAt: new Date().getDate(),
		})
		const createdNote = await createNote.save()
		if (!createdNote) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(201).json({ message: 'Successfully Created Note', note: createdNote })
	} catch (e) {
		next(e)
	}
}

exports.updateNotePostController = async (req, res, next) => {
	try {
		const { title, note, isRunning, isCompleted } = req.body
		const { id } = req.params

		const hasNote = await Note.findById(id)
		if (!hasNote) {
			return res.status(204).json({ message: 'Note Item Is Not Available' })
		}
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: id },
			{
				title: title || hasNote.title,
				note: note || hasNote.note,
				isRunning: isRunning || hasNote.isRunning,
				isCompleted: isCompleted || hasNote.isCompleted,
			},
			{ new: true }
		)
		if (!updatedNote) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(200).json({ message: 'Successfully Updated Note', note: updatedNote })
	} catch (e) {
		next(e)
	}
}

exports.deleteNoteGetController = async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedNote = await Note.findOneAndDelete({ _id: id })
		if (!deletedNote) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(200).json({ message: 'Successfully Deleted Note', note: deletedNote })
	} catch (e) {
		next(e)
	}
}

exports.noteSelectTypeGetController = async (req, res, next) => {
	try {
		const { id } = req.params
		const note = await Note.findById(id)
		if (!note) {
			return res.json(404).json({ message: 'Note is not available' })
		}
		const msg = !note.isCompleted ? 'Completed Note' : 'Running Note'
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: id },
			{
				isCompleted: !note.isCompleted,
			},
			{ new: true }
		)
		if (!updatedNote) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(200).json({ message: msg, note: updatedNote })
	} catch (e) {
		next(e)
	}
}
