const express = require("express");
const router = express.Router();
const {
  addQuestion,
  updatequestions,
  deleteAllQuestion,
  getAllQuestion,
  getOneQuestion,
} = require("../controllers/questionanswer");
const { authMiddleware, isAdmin } = require("../middleware/authmiddlware");

router.post( "/questionanswer", authMiddleware, isAdmin("admin"),  addQuestion);
router.get("/question/:id", authMiddleware, isAdmin("admin"), getOneQuestion);
router.put("/:id", authMiddleware, isAdmin("admin"), updatequestions);
router.delete("/:id", authMiddleware, isAdmin("admin"), deleteAllQuestion);
router.get("/allquestion", authMiddleware, isAdmin("admin"), getAllQuestion);

module.exports = router;
