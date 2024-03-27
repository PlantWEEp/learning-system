const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/questionanswercorrection.routes')
<<<<<<< HEAD
const studentRegister = require("./routes/student.routes")
=======
const studentRoutes = require('./routes/student.routes')
>>>>>>> 8b1eb84f13ea8a548e69ca057d1561cd0f883aed

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
<<<<<<< HEAD
 
app.use('/api/v1', userRoutes);
app.use('/api/v1', studentRegister);
app.use('/api/v1', questionRoutes);
=======

app.use('/api/users', userRoutes);
app.use('/api', questionRoutes);
app.use('/api/student', studentRoutes);
>>>>>>> 8b1eb84f13ea8a548e69ca057d1561cd0f883aed

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
 