const Router = require('express');
const roleController = require('../../controllers/role/role.js');

const router = Router();

router.route('/create').post(roleController.handleCreateRole);
router.route('/delete/:roleId?').delete(roleController.handleDeleteRole);


module.exports = router;
