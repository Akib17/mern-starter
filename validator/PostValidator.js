const { body } = require('express-validator')

const PostValidator = [
    body('title')
    .not()
    .isEmpty().withMessage('Title is required')
        .isLength({ min: 30 }).withMessage('Please provide a good title'),
    body('body')
    .not()
        .isEmpty().withMessage('Post description is required'),
    body('thumbnail')
    .not()
    .isEmpty().withMessage('Please add a post thumbnail')
];

module.exports = PostValidator