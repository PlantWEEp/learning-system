const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
         
    } catch (error) {
         
        process.exit(1);
    }
};

module.exports = connectDB;
