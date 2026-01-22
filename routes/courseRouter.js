const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");
const { courseValidatorBody, courseValidatorParamId, courseValidatorParamLevel } = require("../validators/courseValidator");
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require("../validators/validate");

// Routes avancées
router.get('/level/:level', courseValidatorParamLevel, validate, courseController.getCoursesByLevel);

// Routes Basiques
router.get('', courseController.getAllCourses);
router.get('/:id', courseValidatorParamId, validate, courseController.getCourseById);
router.post('', authMiddleware, courseValidatorBody, validate, courseController.createCourse);
router.put('/:id', authMiddleware, courseValidatorParamId, courseValidatorBody, validate, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseValidatorParamId, validate, courseController.deleteCourse);

module.exports = router;