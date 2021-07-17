const { body } = require('express-validator');

const eduValidator = [
    body('school')
        .not()
        .isEmpty().withMessage('Please provide your school'),
    body('degree')
        .not()
        .isEmpty().withMessage('Please provide your degree'),
    body('fieldofstudy')
        .not()
        .isEmpty().withMessage('Please provide your field of study'),
    body('from')
        .not()
        .isEmpty().withMessage('Please provide your starting date')

];

module.exports = eduValidator;