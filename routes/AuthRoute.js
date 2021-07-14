const { signupController, activateAccount, loginController, passwordResetRequest, passwordResetVerify } = require('../controller/AuthController');
const loginValidator = require('../validator/LoginValidator');
const resetPasswordEmailValidator = require('../validator/ResetPasswordEmailValidator');
const passwordResetValidator = require('../validator/ResetPasswordValidator');
const SignupValidator = require('../validator/SignupValidator');

const router = require('express').Router();

router.post('/signup', SignupValidator, signupController); // Signup
router.get('/activate/:activationToken', activateAccount); // Active Account
router.post('/login', loginValidator, loginController); // Login
router.post('/password/reset/request',resetPasswordEmailValidator , passwordResetRequest); // Password reset request
router.post('/password/verify/:passwordResetToken',passwordResetValidator , passwordResetVerify) // Password reset verify

module.exports = router;