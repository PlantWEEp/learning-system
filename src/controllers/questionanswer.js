const express = require('express');
const z = require("zod");
const QuestionAnswer = require("../models/questionanswer.model");

const questionanswerSchema = z.object({
    section: z.array(z.object({
        question: z.string(),
        answer: z.string(),
        wronganswer: z.array(z.string()), 
        description: z.string(),
        category: z.string(),
    }))
});

const studentanswers = async (req, res) => {
    try {
        const questionanswerData = questionanswerSchema.parse(req.body);
        const { section } = questionanswerData;

        // Create a new question-answer document
        const newQuestionAnswer = await QuestionAnswer.create({ section });
        
        await newQuestionAnswer.save()
        res.status(201).json({
            success: true,
            message: 'Question-Answer pair created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success: false,
            message: 'Failed to create question-answer pair'
        });
    }
};

const updatequestions = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        console.log('ID received:', id);
        const updatedquestion = await QuestionAnswer.findByIdAndUpdate(id, newData,{ new: true });
        if (!updatedquestion ) {
            res.status(404).json({ message: 'No document found to update' });
        } else {
            res.json({ message: 'Document updated successfully' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    studentanswers,
    updatequestions
};
