
const express = require('express');
const router = express.Router();
const { studentanswers } = require('../controllers/questionanswer')


router.post('/questionanswer',studentanswers)


module.exports = router;