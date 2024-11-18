const Route = require('express');
const ProjectCategoryController = require('../../controllers/projectcategory/projectcategory');

const router = Route();

router.route('/create').post(ProjectCategoryController.handleCreateProjectCategory);
router.route('/update/:categoryId').patch(ProjectCategoryController.handleUpdateProjectCategory);
router.route('/get/:categoryId').get(ProjectCategoryController.handleGetProjectCategory);
router.route('/delete/:categoryId').delete(ProjectCategoryController.handleDeleteProjectCategory);

module.exports = router;