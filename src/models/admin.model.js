const mongoose = require('mongoose'); 

const adminSchema = new Schema({
    name: { 
        type: String,  
    },
    password:{
        type: String, 
        require: true
    },
    email:{
        type: String, 
        require: true,
        unique: true
    }
})

module.exports = mongoose.model("Admin",adminSchema)