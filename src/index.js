const express = require("express");
const connectDB = require("./db/connectDB")

require('dotenv').config();
const app = express()

connectDB()

.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


