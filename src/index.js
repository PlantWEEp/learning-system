const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/questionanswercorrection.routes')
const studentRegister = require("./routes/student.routes")

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
 
app.use('/api/v1', userRoutes);
app.use('/api/v1', studentRegister);
app.use('/api/v1', questionRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
 