const express = require('express');
const router = express.Router();
const { studentanswers, updatequestions,deleteAllQuestion,getAllQuestion } = require('../controllers/questionanswer');
const {authMiddleware, isAdmin} = require("../middleware/authmiddlware");

router.post('/questionanswer',isAdmin ,authMiddleware ,studentanswers)
router.put('/:id',isAdmin, authMiddleware ,updatequestions)
router.delete("/:id",isAdmin, authMiddleware ,deleteAllQuestion) 
router.get("/all-question",isAdmin, authMiddleware ,getAllQuestion)


module.exports = router;