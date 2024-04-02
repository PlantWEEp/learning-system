
const express = require('express');
const router = express.Router();
const { studentanswers, updatequestions,deleteAllQuestion,getAllQuestion } = require('../controllers/questionanswer')


router.post('/questionanswer',studentanswers)
router.put('/:id',updatequestions)
router.delete("/:id",deleteAllQuestion) 
router.get("/all-question",getAllQuestion)

module.exports = router;