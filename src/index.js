const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser"); 

require('dotenv').config();
const app = express(); 

app.use(bodyParser.json());


const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/questionanswercorrection.routes')
const studentRoutes = require('./routes/student.routes')
  
app.use('/api/v1/admin', userRoutes);
app.use('/api/v1/question', questionRoutes);
app.use('/api/v1/student', studentRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => { 
    });
  })
  .catch((err) => {
      err 
  });