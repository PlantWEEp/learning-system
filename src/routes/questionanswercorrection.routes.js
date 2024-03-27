
const express = require('express');
const router = express.Router();
const { studentanswers, updatequestions } = require('../controllers/questionanswer')


router.post('/questionanswer',studentanswers)
router.put('/update/:id',updatequestions)


module.exports = router;