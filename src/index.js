const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user.routes');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
 