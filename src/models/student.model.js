const mongoose = require('mongoose');
const { Schema } = mongoose;  

const studentSchema = new Schema({
    name: { 
        type: String,
        required: true, 

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true  
    },
    phone: {
        type: Number,
        required: true  
    },
    designation: {
        type: String,
        required: true,
        enum: ['Central Bank of India', 'State Bank of India']
    },
    bankname: {
        type: String,
        required: true
    },
    UPItransactionid: {
        type: Number,
        required: true,
        unique: true
    },
    
});

module.exports = mongoose.model("Student", studentSchema);