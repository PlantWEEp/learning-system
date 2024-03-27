// userRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin,studentLogin,adminRegister } = require('../controllers/user');
 
 
router.post('/adminlogin', adminLogin);
router.post('/adminregister', adminRegister);
router.get('/studentlogin', studentLogin);


module.exports = router;
