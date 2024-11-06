const Router = require('express');
const userController = require('../../controllers/user/user');

const router = Router();

router.route("/create").post(userController.handleCreateUser);
router.route("/get/:userId?").get(userController.handleGetUser);
router.route("/delete/:userId?").delete(userController.handleDeleteUser);
router.route("/update/:userId?").patch(userController.handleUpdateUser);

module.exports = router;