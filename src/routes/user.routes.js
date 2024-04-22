const express = require('express');
const router = express.Router();
const { adminLogin,adminRegister, adminLogout, updatePassword, adminProfile } = require('../controllers/user'); 
const { authMiddleware ,isAdmin }= require('../middleware/authmiddlware'); 
const { getStudentData } = require('../controllers/student');

 
router.post('/login', adminLogin);
router.post('/register', adminRegister); 
router.post("/logout" , authMiddleware, isAdmin("admin") ,adminLogout);
router.get('/get-student', authMiddleware ,isAdmin("admin") ,getStudentData);
router.get('/adminprofile', authMiddleware ,isAdmin("admin") ,adminProfile)
router.post('/updatepassword/:id', authMiddleware, isAdmin("admin") ,updatePassword)

module.exports = router;
