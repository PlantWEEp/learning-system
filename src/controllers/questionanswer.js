const express = require('express');
const z = require("zod");
const questionanswer = require("../models/questionanswer.model");

const questionanswerSchema = z.object({
    question: z.string(),
    answer: z.string(),
    wronganswer: z.array(z.string()), 
    description: z.string(),
    category: z.string(),
});

const studentanswers = async (req, res) => {
    try {
        const questionanswerData = questionanswerSchema.safeParse(req.body);
        const { question, answer, wronganswer, description, category } = questionanswerData;

        // Create a new question-answer document
        const newQuestionAnswer = await questionanswer.create({
            question,
            answer,
            wronganswer,
            description,
            category,
        });

        await newQuestionAnswer.save();
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

module.exports = {
    studentanswers
};
