const Router = require('express');
const MeetingAttendeeController = require('../../controllers/meetingattendees/meetingattendees');

const router = Router();

router.route('/create').post(MeetingAttendeeController.handleCreateMeetingAttendee);
router.route('/delete').delete(MeetingAttendeeController.handleDeleteMeetingAttendee);

router.route('/getUserMeetings/:userId').get(MeetingAttendeeController.handleGetMeetingsByUserId);
router.route('/getMeetingAttendees/:meetingId').get(MeetingAttendeeController.handleGetAttendeesByMeetingId);


module.exports = router;