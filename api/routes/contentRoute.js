const router = require('express').Router()

// Imported Middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')

// Imported Controllers
const {
	getAllNoteItemGetController,
	createNotePostController,
	updateNotePostController,
	deleteNoteGetController,
	noteSelectTypeGetController
} = require('../controllers/contentController')

router.get('/all', isAuthenticated, getAllNoteItemGetController)
router.post('/create', isAuthenticated, createNotePostController)
router.put('/update/:id', isAuthenticated, updateNotePostController)
router.delete('/delete/:id', isAuthenticated, deleteNoteGetController)
router.get('/type/:id',isAuthenticated,noteSelectTypeGetController)
module.exports = router
