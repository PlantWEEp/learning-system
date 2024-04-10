// studentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent,updateStudentRegister,deleteStudentRegister,getStudentData } = require('../controllers/student');
const authMiddleware = require('../middleware/authmiddlware');


router.post('/registerstudent',authMiddleware,registerStudent) 
router.put('/:id',authMiddleware,updateStudentRegister) 
router.delete('/:id',authMiddleware,deleteStudentRegister) 
router.get('/get-student' ,getStudentData)


module.exports = router;