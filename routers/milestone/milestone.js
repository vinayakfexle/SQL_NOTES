const Router = require('express');
const MilestoneController = require('../../controllers/milestone/milestone.js');
const router = Router();

router.route('/create').post(MilestoneController.handleCreateMilestone);
router.route('/update/:milestoneId').patch(MilestoneController.handleUpdateMilestone);
router.route('/get/:milestoneId').get(MilestoneController.handleGetMilestone);
router.route('/delete/:milestoneId').delete(MilestoneController.handleDeleteMilestone);

module.exports = router;