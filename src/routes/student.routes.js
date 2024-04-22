const express = require('express');
const router = express.Router();
const { registerStudent, updateStudentRegister, deleteStudentRegister, getStudentData, studentLogin, getOneStudent } = require('../controllers/student');
const { authMiddleware, isAdmin } = require('../middleware/authmiddlware');
  

// Student login
router.post("/auth/login",isAdmin("student") , studentLogin);
router.post('/registerstudent', registerStudent);
 
// Apply isAdmin middleware to routes that require admin access
router.put('/:id', authMiddleware  ,isAdmin("admin")  ,  updateStudentRegister);
router.delete('/:id', authMiddleware ,isAdmin("admin")  , deleteStudentRegister);
router.get('/get-student', authMiddleware ,isAdmin("admin")  ,  getStudentData);
router.get('/:id', authMiddleware ,isAdmin("admin")  ,  getOneStudent);

module.exports = router;