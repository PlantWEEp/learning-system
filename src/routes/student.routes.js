// studentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent,updateStudentRegister,deleteStudentRegister } = require('../controllers/student')

// Define route for GET request to register student
router.post('/registerstudent',registerStudent) 
router.put('/:id',updateStudentRegister) 
router.delete('/:id',deleteStudentRegister) 


module.exports = router;