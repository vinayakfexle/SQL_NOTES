const Router = require('express');
const authController = require('../../controllers/user/auth');

const router = Router();

router.route("/login").post(authController.handleLogin);
router.route("/register").post(authController.handleRegister);
router.route("/sendemailforgetpassword").post(authController.sendResetPasswordMail);
router.route("/resetpassword").patch(authController.handleResetPassword);
router.route("/changepassword").patch(authController.handleChangePassword);

module.exports = router;