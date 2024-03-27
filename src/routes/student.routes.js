// studentRoutes.js
const express = require('express');
const router = express.Router();
const { studentLogin, getStudentLogin } = require('../controllers/student')

// Define route for GET request to register student
router.post('/student',studentLogin)
router.get('/allstudent',getStudentLogin)


module.exports = router;