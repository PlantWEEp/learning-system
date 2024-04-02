const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentRegisterSchema = new Schema({
    studentEmail: {
        type: Schema.Types.String,
        ref: 'Student',  
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const StudentRegister = mongoose.model("StudentRegister", studentRegisterSchema);

module.exports = StudentRegister;
