const Router = require('express');
const taskController = require('../../controllers/task/task.js');

const router = Router();

router.route('/create').post(taskController.handleCreateTask);
router.route('/get/:taskId?').get(taskController.handleGetTask);
router.route('/update/:taskId?').patch(taskController.handleUpdateTask);
router.route('/delete/:taskId?').delete(taskController.handleDeleteTask);


module.exports = router;