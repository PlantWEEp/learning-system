const express = require('express');
const router = express.Router();
const { adminLogin,adminRegister, adminLogout } = require('../controllers/user'); 
const authMiddleware = require('../middleware/authmiddlware'); 

 
router.post('/login', adminLogin);
router.post('/register', adminRegister); 
router.post("/logout" , authMiddleware ,adminLogout)

module.exports = router;
