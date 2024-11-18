const Router = require('express');
const ProjectTagController = require('../../controllers/projecttag/projecttag');

const router = Router();

router.route('/create').post(ProjectTagController.handleCreateProjectTag);
router.route('/delete').delete(ProjectTagController.handleDeleteProjectTag);

module.exports = router;