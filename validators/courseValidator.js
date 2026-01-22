const { body, param, query } = require('express-validator');
const categoryService = require('../services/categoryService');

const courseValidatorBody = [
    body('title')
        .notEmpty().withMessage('Le titre (\'title\') est obligatoire.')
        .isString().withMessage('Le titre (\'title\') doit être une chaîne de caractères.'),
    body('description')
        .notEmpty().withMessage('La description est obligatoire.')
        .isString().withMessage('La description doit être une chaîne de caractères.'),
    body('duration')
        .notEmpty().withMessage('La durée du cursus (\'duration\') est obligatoire.')
        .isInt({ min: 0 }).withMessage('La durée du cursus (\'duration\') doit être un entier positif représentant des minutes.'),
    body('level')
        .notEmpty().withMessage('Le niveau (\'level\') est obligatoire.')
        .isIn(['novice', 'medium', 'advanced']).withMessage('Le niveau (\'level\') doit être un choix parmi \'novice\', \'medium\' ou \'advanced\' uniquement.'),
    body('price')
        .notEmpty().withMessage('Le prix du cursus (\'price\') est obligatoire.')
        .isFloat({ min: 0 }).withMessage('Le prix du cursus (\'price\') doit être un nombre décimal positif.'),
    body('published')
        .optional(true)
        .isBoolean().withMessage('La notion de publication (\'published\') du cursus doit être une valeur booléenne.'),
    body('instructor')
        .notEmpty().withMessage('L\'instructeur (\'instructor\') doit être renseigné.')
        .isString().withMessage('L\'instructeur (\'instructor\') renseigné doit être une chaîne de caractères.'),
    body('category_id')
        .notEmpty().withMessage('L\'id de la catégorie (\'category\') rattachée doit être renseigné.')
        .isInt({ min: 1 }).withMessage('L\'id de la catégorie (\'category\') doit être un entier strictement positif.')
        .custom( async (categoryId) => {
            try{
                const category = await categoryService.getCategoryById(categoryId);
                if (!category) {
                    return Promise.reject(new Error("La catégorie ('category') renseignée n'existe pas en base de données."));
                } else {
                    return true;
                }
            } catch (error) {
                return Promise.reject(new Error("La catégorie ('category') renseignée n'a pas pu être vérifié en base de données."));
            }
        })
];

const courseValidatorParamId = [
    param('id')
        .notEmpty().withMessage('L\'id est obligatoire')
        .isInt().withMessage('L\'id doit être un nombre entier')
];

const courseValidatorParamLevel = [
    param('level')
        .notEmpty().withMessage('Le niveau (\'level\') n\'est pas renseigné ou vide.')
        .isIn(['novice', 'medium', 'advanced']).withMessage('Le niveau (\'level\') doit être un choix parmis \'novice\', \'medium\' ou \'advanced\' uniquement.')
];

const courseValidatorParamKeyword = [
    query('keyword')
        .notEmpty().withMessage('Le champ keyword n\'est pas renseigné ou vide.')
        .isString().withMessage('Le champ keyword doit être une chaîne de caractères.')
];

const courseValidatorParamPrice = [
    query('minPrice')
        .optional(true)
        .isFloat({ min: 0 }).withMessage('La valeur minimal du prix du cours (\'minPrice\') doit être un nombre décimal positif.'),
    query('maxPrice')
        .optional(true)
        .isFloat({ min: 0 }).withMessage('La valeur maximal du prix du cours (\'minPrice\') doit être un nombre décimal positif.')
        .custom((maxPrice, { req }) => {
            if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
                const minPrice = parseFloat(req.query.minPrice);
                maxPrice = parseFloat(maxPrice);
                if (maxPrice <= minPrice) {
                    throw new Error('La valeur maximale du prix (\'maxPrice\') doit être strictement supérieure à la valeur minimale (\'minPrice\').');
                }
            }
            return true;
        })
];

module.exports = { courseValidatorBody, courseValidatorParamId, courseValidatorParamLevel, courseValidatorParamKeyword, courseValidatorParamPrice };