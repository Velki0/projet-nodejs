const { body, param } = require('express-validator');

const categoryValidatorBody = [
    body('name')
        .notEmpty().withMessage('Le nom (\'name\') est obligatoire.')
        .isString().withMessage('Le nom (\'name\') doit être une chaîne de caractères.')
        .isLength({ min: 3 }).withMessage('Le nom (\'name\') doit contenir au minimum 3 caractères.'),
    body('description')
        .optional(true)
        .isString().withMessage('La description doit être une chaîne de caractères.'),
];

const categoryValidatorParamId = [
    param('id')
        .notEmpty().withMessage('L\'id est obligatoire')
        .isInt().withMessage('L\'id doit être un nombre entier')
];

module.exports = { categoryValidatorBody, categoryValidatorParamId }