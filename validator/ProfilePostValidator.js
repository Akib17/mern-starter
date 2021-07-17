const { body } = require('express-validator');

const ProfileValidator = [
    body('status')
        .not()
        .isEmpty().withMessage('Please Provide your status'),
    body('skills')
        .not()
        .isEmpty().withMessage('Please provide your skills')
];

module.exports = ProfileValidator