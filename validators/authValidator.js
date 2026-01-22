const { body } = require('express-validator');
const userService = require('../services/userService');

const registerValidationRules = [
    body('username')
        .notEmpty().withMessage('Le username doit être renseigné.')
        .isLength({ min: 3 }).withMessage('Le username doit contenir au minimum 3 caractères.')
        .custom( async (username) => {
            const user = await userService.getUserByUsername(username);
            if (user) {
                return Promise.reject(new Error('Le username renseigné n\'est pas disponible, il existe déjà.'));
            } else {
                return true;
            }
        }),
    body('email')
        .isEmail().withMessage('Email non conforme.')
        .normalizeEmail()
        .custom( async (email) => {
            const user = await userService.getUserByEmail(email);
            if (user) {
                return Promise.reject(new Error('L\'email renseigné n\'est pas disponible, un autre compte est associé à cet email.'));
            } else {
                return true;
            }
        }),
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
