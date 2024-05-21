const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    bankname: {
        type: String,
        required: true
    },
    UPItransactionid: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        default: 'student'
    },
    password:{
        type: String,
    }
}); 

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
