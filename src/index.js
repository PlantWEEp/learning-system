const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const cors = require('cors');


require('dotenv').config();
const app = express();
app.use(cors());

app.use(bodyParser.json());




const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/questionanswercorrection.routes')
const studentRoutes = require('./routes/student.routes')
  
app.use('/api/admin', userRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/student', studentRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });