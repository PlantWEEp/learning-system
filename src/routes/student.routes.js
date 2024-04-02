// studentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent,updateStudentRegister,deleteStudentRegister,getStudentData } = require('../controllers/student')


router.post('/registerstudent',registerStudent) 
router.put('/:id',updateStudentRegister) 
router.delete('/:id',deleteStudentRegister) 
router.get('/get-student',getStudentData) 


module.exports = router;