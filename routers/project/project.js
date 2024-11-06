const Router = require('express');
const projectController = require('../../controllers/project/project');

const router = Router();

router.route('/create').post(projectController.handleCreateProject);
router.route('/update/:userId?').patch(projectController.handleUpdateProject);

module.exports = router;