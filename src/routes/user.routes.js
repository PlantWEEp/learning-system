// userRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin,studentRegistration,adminRegister } = require('../controllers/user');
 
 
router.post('/adminlogin', adminLogin);
router.post('/adminregister', adminRegister);
router.get('/studentlogin', studentRegistration);
router.post('/studentlogin', studentRegistration);


module.exports = router;
