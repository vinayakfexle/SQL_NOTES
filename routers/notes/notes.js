const Router = require('express');
const NotesController = require('../../controllers/notes/notes.js');
const router = Router();

router.route('/create').post(NotesController.handleCreateNote);
router.route('/update/:noteId').patch(NotesController.handleUpdateNote);
router.route('/get/:noteId').get(NotesController.handleGetNote);
router.route('/delete/:noteId').delete(NotesController.handleDeleteNote);

module.exports = router;