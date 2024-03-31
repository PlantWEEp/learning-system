
const express = require('express');
const router = express.Router();
const { studentanswers, updatequestions,deleteAllQuestion,sectionData } = require('../controllers/questionanswer')


router.post('/questionanswer',studentanswers)
router.put('/:id/:id',updatequestions)
router.delete("/:id",deleteAllQuestion) 

module.exports = router;