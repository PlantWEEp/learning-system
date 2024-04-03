const express = require('express');
const router = express.Router();
const { studentanswers, updatequestions,deleteAllQuestion,getAllQuestion } = require('../controllers/questionanswer');
const authMiddleware = require("../middleware/authmiddlware");

router.post('/questionanswer', authMiddleware ,studentanswers)
router.put('/:id', authMiddleware ,updatequestions)
router.delete("/:id", authMiddleware ,deleteAllQuestion) 
router.get("/all-question", authMiddleware ,getAllQuestion)


module.exports = router;