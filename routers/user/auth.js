const Router = require('express');
const authController = require('../../controllers/user/auth');

const router = Router();

router.route("/login").post(authController.handleLogin);
router.route("/register").post(authController.handleRegister);

module.exports = router;