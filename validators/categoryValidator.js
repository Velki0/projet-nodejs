const { body, param } = require('express-validator');
const categoryService = require('../services/categoryService');

const categoryValidatorBody = (isUpdate) => [
    body('name')
        .notEmpty().withMessage('Le nom (\'name\') est obligatoire.')
        .isString().withMessage('Le nom (\'name\') doit être une chaîne de caractères.')
        .isLength({ min: 3 }).withMessage('Le nom (\'name\') doit contenir au minimum 3 caractères.')
        .custom( async (name, { req }) => {
            try{
                const category = await categoryService.getCategoryByName(name);
                if (category) {
                    // Si c'est une mise à jour (PUT), vérifier que la catégorie trouvée est bien celle en cours de modification.
                    if (isUpdate) {
                        const categoryId = req.params.id;
                        if (category.id !== parseInt(categoryId)) {
                            return Promise.reject(new Error("Le nom de la catégorie ('category') existe déjà en base de données."));
                        }
                    } else {
                    // Si c'est une création (POST), rejeter si le nom existe déjà.
                    return Promise.reject(new Error("Le nom de la catégorie ('category') existe déjà en base de données."));
                    }
                }
                return true;
            } catch (error) {
                return Promise.reject(new Error("Le nom de la catégorie ('category') n'a pas pu être vérifié en base de données."));
            }
        }),
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