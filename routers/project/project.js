const Router = require('express');
const projectController = require('../../controllers/project/project');

const router = Router();

router.route('/create').post(projectController.handleCreateProject);
router.route('/update/:projectId?').patch(projectController.handleUpdateProject);
router.route('/get/:projectId?').get(projectController.handleGetProject);

module.exports = router;