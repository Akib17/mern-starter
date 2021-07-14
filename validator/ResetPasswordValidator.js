const { body } = require('express-validator');

const passwordResetValidator = [
    body('password')
        .not()
        .isEmpty().withMessage('Please provide your new password')
];

module.exports = passwordResetValidator