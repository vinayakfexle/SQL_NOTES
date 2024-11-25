const Router = require('express');
const FileAtttachmentController = require('../../controllers/fileattachment/fileattachment.js');
const router = Router();

router.route('/create').post(FileAtttachmentController.handleCreateFileAttachment);
router.route('/update/:fileId').patch(FileAtttachmentController.handleUpdateFileAttachment);
router.route('/get/:fileId').get(FileAtttachmentController.handleGetFileAttachment);
router.route('/delete/:fileId').delete(FileAtttachmentController.handleDeleteFileAttachment);

module.exports = router;