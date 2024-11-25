const Router = require('express');
const MenuItemController = require('../../controllers/menuItem/menuItem.js');
const router = Router();

router.route('/create').post(MenuItemController.handleCreateMenuItem);
router.route('/update/:menuItemId').patch(MenuItemController.handleUpdateMenuItem);
router.route('/get/:menuItemId').get(MenuItemController.handleGetMenuItem);
router.route('/delete/:menuItemId').delete(MenuItemController.handleDeleteMenuItem);
module.exports = router;