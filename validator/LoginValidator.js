const { body } = require('express-validator');
const User = require('../models/User');


const loginValidator = [
    body('email')
        .not()
        .isEmpty().withMessage('Please provide your email')
        .isEmail().withMessage('Please provide valid email')
        .custom(async (email) => {
            let user = await User.findOne({ email });
            if (!user) return 'Credential Not Match';
        }),
    body('password')
        .not()
        .isEmpty().withMessage('Please provide your password')        
];

module.exports = loginValidator