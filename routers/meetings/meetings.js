const Router = require('express');
const MeetingController = require('../../controllers/meetings/meetings.js');

const router = Router();

router.route('/create').post(MeetingController.handleCreateMeeting);
router.route('/get/:meetingId').get(MeetingController.handleGetMeeting);
router.route('/update/:meetingId').patch(MeetingController.handleUpdateMeeting);
router.route('/delete/:meetingId').delete(MeetingController.handleDeleteMeeting);

module.exports = router;