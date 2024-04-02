// studentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/student')

// Define route for GET request to register student
router.post('/registerStudent',registerStudent) 


module.exports = router;