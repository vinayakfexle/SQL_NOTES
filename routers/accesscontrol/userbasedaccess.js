const Router = require('express');
const updateUserAccess = require('../../controllers/accesscontrol/userbasedaccess');

const router  = Router();

router.route('/updateuserpermission').put(updateUserAccess);

module.exports = router;