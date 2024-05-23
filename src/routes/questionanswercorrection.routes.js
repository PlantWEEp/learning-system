const express = require("express");
const router = express.Router();
const {
  addQuestion,
  updatequestions,
  deleteAllQuestion,
  getAllQuestion,
  getOneQuestion,
  questionCount,
} = require("../controllers/questionanswer");
const { authMiddleware, isAdmin } = require("../middleware/authmiddlware"); 

router.post( "/add-questions", authMiddleware, isAdmin("admin"),  addQuestion);
router.get("/question/:id", authMiddleware, isAdmin("admin"), getOneQuestion);
router.put("/:id", authMiddleware, isAdmin("admin"), updatequestions);
router.delete("/:id", authMiddleware, isAdmin("admin"), deleteAllQuestion);
router.get("/allquestion", authMiddleware, isAdmin("admin"), getAllQuestion);
router.get("/questionCount", authMiddleware, isAdmin("admin"), questionCount);


module.exports = router;
