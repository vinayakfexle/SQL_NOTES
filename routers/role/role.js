const Router = require('express');
const roleController = require('../../controllers/role/role.js');

const router = Router();

router.route('/create').post(roleController.creatRole);
router.route('/delete').delete(roleController.deleteRole);

module.exports = Router;
