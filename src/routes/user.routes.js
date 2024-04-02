// userRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin,studentRegistration,adminRegister } = require('../controllers/user');
const { authMiddleware } = require('../middleware/authmiddlware.js'); 
 
 
router.post('/adminlogin',authMiddleware, adminLogin);
router.post('/adminregister', adminRegister); 


module.exports = router;
