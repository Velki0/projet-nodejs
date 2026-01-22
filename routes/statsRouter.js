const express = require('express');
const router = express.Router();
const courseController = require("../controllers/courseController");
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/courses', authMiddleware, adminMiddleware, courseController.getStatsOnCourses);
router.get('/users', authMiddleware, adminMiddleware, userController.getStatsOnUsers);

module.exports = router;
