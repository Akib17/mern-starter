const { body } = require('express-validator');
const User = require('../models/User');

const SignupValidator = [
    body('name')
        .not()
        .isEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be greater then 2 letter'),
    body('email')
        .custom(async email => {
            let userEmail = await User.findOne({ email });
            if (userEmail) {
                return Promise.reject('Email already exist');
            }
        })
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('phone')
        .not()
        .isEmpty().withMessage('Please provide a Phone Number'),
    body('password')
        .not()
        .isEmpty().withMessage('Please provide a strong password')
        .custom(value => {
            if (value.length < 5) throw new Error('Password must be more than 5 char');
            return true;
        })
];

module.exports = SignupValidator;