const Router = require('express');
const tagController = require('../../controllers/tag/tag.js');

const router = Router();

router.route('/create').post(tagController.handleCreateTag);
router.route('/get/:tagId').get(tagController.handleGetTag);
router.route('/update/:tagId').patch(tagController.handleUpdateTag);
router.route('/delete/:tagId').delete(tagController.handleDeleteTag);

module.exports = router;
