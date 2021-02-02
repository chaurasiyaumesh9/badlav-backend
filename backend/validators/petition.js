const { check, validationResult } = require('express-validator');

exports.validateCreateRequest = [
    check('title')
    .notEmpty()
    .withMessage('Petition Title is required'),
    check('type')
    .notEmpty()
    .withMessage('Petition Type is required'),
    check('recipients')
    .notEmpty()
    .withMessage('Recipient(s) are required'),
    check('problem')
    .notEmpty()
    .withMessage('Kindly specify more about the problem you are petitioning for')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}