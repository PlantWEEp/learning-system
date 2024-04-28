const z = require("zod");
const QuestionAnswer = require("../models/questionanswer.model");

const questionanswerSchema = z.object({
  sectionName: z.string(),
  question: z.string(),
  choices: z.array(
    z.object({
      value: z.string(),
      isCorrect: z.boolean(),
    })
  ),
  description: z.string(),
  category: z.string(),
});

const addQuestion = async (req, res) => {
  try {
    const questionanswerData = questionanswerSchema.parse(req.body);

    const { description, choices, question, sectionName, category } =
      questionanswerData;

    const createQuestions = await QuestionAnswer.create({
      description,
      sectionName,
      choices,
      question,
      category,
    });

    await createQuestions.save();

    res.json({ message: "Document updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to create question-answer pair",
    });
  }
};

const updatequestions = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const updatedquestion = await QuestionAnswer.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );
    if (!updatedquestion) {
      res.status(404).json({ message: "No document found to update" });
    } else {
      res.json({ message: "Document updated successfully" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAllQuestion = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    console.log("ID received:", id);
    const deletequestion = await QuestionAnswer.findByIdAndDelete(id, newData);
    {
      res.json({ message: "Document deleted successfully" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneQuestion = async (req, res) => {
  try {
    const reqid = req.params.id; 
    const findquestion = await QuestionAnswer.findById( reqid );
    if (!findquestion) {
      res.status(404).json({ message: "No document to be found" });
    } else {
      res.json(findquestion);
    }
  } catch (error) {
    res.status(500).json({ error: "Fail to get one questios" });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const students = await QuestionAnswer.find({});
    res.json(students);
  } catch (error) {
    console.error("Error retrieving student data:", error); 
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addQuestion,
  updatequestions,
  deleteAllQuestion,
  getAllQuestion,
  getOneQuestion,
};
