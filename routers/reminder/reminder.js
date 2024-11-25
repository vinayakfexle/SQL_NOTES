const Router = require('express');
const reminderController = require('../../controllers/reminder/reminder.js');

const router = Router();

router.route('/create').post(reminderController.handleCreateRemainder);
router.route('/get/:reminderId?').get(reminderController.handleGetReminder);
router.route('/update/:reminderId?').patch(reminderController.handleUpdateReminder);
router.route('/delete/:reminderId?').delete(reminderController.handleDeleteReminder);

module.exports = router;
