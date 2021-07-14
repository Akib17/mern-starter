const { body } = require('express-validator')

const resetPasswordEmailValidator = [
    body('email')
    .not()
    .isEmpty().withMessage('Please provide your email')
    .isEmail().withMessage('Please provide a valid email')
];

module.exports = resetPasswordEmailValidator