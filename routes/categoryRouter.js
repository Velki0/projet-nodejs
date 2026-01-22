const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { categoryValidatorBody, categoryValidatorParamId } = require("../validators/categoryValidator");
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require("../validators/validate");

// Routes Basiques
router.get('', categoryController.getAllCategories);
router.get('/:id', categoryValidatorParamId, validate, categoryController.getCategoryById);
router.post('', authMiddleware, categoryValidatorBody, validate, categoryController.createCategory);
router.put('/:id', authMiddleware, categoryValidatorParamId, categoryValidatorBody, validate, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryValidatorParamId, validate, categoryController.deleteCategory);

module.exports = router;