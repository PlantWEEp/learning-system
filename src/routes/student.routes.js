const express = require('express');
const router = express.Router();
const { registerStudent, updateStudentRegister, deleteStudentRegister, getStudentData, studentLogin } = require('../controllers/student');
const { authMiddleware, isAdmin } = require('../middleware/authmiddlware');
  

// Student login
router.post("/auth/login", studentLogin);
router.post('/registerstudent', registerStudent);
 
// Apply isAdmin middleware to routes that require admin access
router.put('/:id', authMiddleware ,  updateStudentRegister);
router.delete('/:id', authMiddleware , deleteStudentRegister);
router.get('/get-student', authMiddleware ,  getStudentData);

module.exports = router;
