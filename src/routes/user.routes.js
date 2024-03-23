// userRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/user');



// Define route for GET request to register user
router.post('/', adminLogin);


module.exports = router;
