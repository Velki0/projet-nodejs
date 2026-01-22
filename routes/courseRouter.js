const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");
const { courseValidatorBody, courseValidatorParamId, courseValidatorParamLevel, courseValidatorParamKeyword, courseValidatorParamPrice } = require("../validators/courseValidator");
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validate = require("../validators/validate");

// Routes avancées
router.get('/level/:level', courseValidatorParamLevel, validate, courseController.getCoursesByLevel);
router.get('/search', courseValidatorParamKeyword, validate, courseController.getCoursesBySearchKeyword);
router.get('/filter', courseValidatorParamPrice, validate, courseController.getCoursesByFilterPrice);

// Routes Basiques
router.get('', courseController.getAllCourses);
router.get('/:id', courseValidatorParamId, validate, courseController.getCourseById);
router.post('', authMiddleware, courseValidatorBody, validate, courseController.createCourse);
router.put('/:id', authMiddleware, courseValidatorParamId, courseValidatorBody, validate, courseController.updateCourse);
router.delete('/:id', authMiddleware, adminMiddleware, courseValidatorParamId, validate, courseController.deleteCourse);

module.exports = router;