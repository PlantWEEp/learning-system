// studentRoutes.js
const express = require('express');
const router = express.Router();
const { studentLogin } = require('../controllers/student')

// Define route for GET request to register student
router.post('/student',studentLogin)


module.exports = router;