const Router = require('express');
const taskController = require('../../controllers/task/task.js');

const router = Router();

router.route('/get').get(taskController.handleGetTask);
router.route('/create').post(taskController.handleCreateTask);
router.route('/update').patch(taskController.handleUpdateTask);
router.route('/delete').delete(taskController.handleDeleteTask);


return router;