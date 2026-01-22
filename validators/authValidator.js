const { body } = require('express-validator');

const registerValidationRules = [
    body('username')
        .notEmpty().withMessage('Le username doit être renseigné.')
        .isLength({ min: 3 }).withMessage('Le username doit contenir au minimum 3 caractères.'),
    body('email')
        .isEmail().withMessage('Email non conforme.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au minimum 6 caractères.'),
    body('role')
        .notEmpty().withMessage('Le role doit être renseigné.')
        .isIn(['instructor', 'admin']).withMessage('Le role renseigné doit être \'instructor\' ou bien \'admin\' uniquement.')
];


const loginValidationRules = [
    body('username')
        .notEmpty().withMessage('Le username doit être renseigné.')
        .isLength({ min: 3 }),
    body('password').notEmpty().withMessage('Le mot de passe doit être renseigné.'),
];

module.exports = { registerValidationRules, loginValidationRules };
