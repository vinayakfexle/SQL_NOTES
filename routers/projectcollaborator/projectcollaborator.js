const Router = require('express');
const ProjectCollaboratorController = require('../../controllers/projectcollaborator/projectcollaborator.js');

const router = Router();

router.route('/create').post(ProjectCollaboratorController.handleCreateProjectCollaborator);
router.route('/update/:collaboratorId').patch(ProjectCollaboratorController.handleUpdateProjectCollaborator);
router.route('/get/:collaboratorId').get(ProjectCollaboratorController.handleGetProjectCollaborator);
router.route('/delete/:collaboratorId').delete(ProjectCollaboratorController.handleDeleteProjectCollaborator);

module.exports = router;