// userRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin,studentRegistration,adminRegister } = require('../controllers/user');
const { authMiddleware } = require('../middleware/authmiddlware.js');
const { studentLoginRegister } = require('../controllers/student.js');
 
 
router.post('/adminlogin',authMiddleware, adminLogin);
router.post('/adminregister', adminRegister);
router.get('/studentlogin', studentRegistration);
router.post('/studentlogin', studentRegistration); 


module.exports = router;
