// studentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent,updateStudentRegister,deleteStudentRegister,getStudentData ,studentLogin} = require('../controllers/student');
const {authMiddleware,isAdmin} = require('../middleware/authmiddlware');

//student login
router.post("/auth/login", studentLogin) 
//
router.post('/registerstudent',registerStudent) 
router.put('/:id',isAdmin,authMiddleware,updateStudentRegister) 
router.delete('/:id',isAdmin,authMiddleware,deleteStudentRegister) 
router.get('/get-student',isAdmin,authMiddleware,getStudentData)


module.exports = router;