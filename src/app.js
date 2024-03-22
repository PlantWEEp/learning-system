
const express = require("express");
const userRoute = require("./routes/user.routes");

const app = express();

app.use("/api/v1/register", userRoute); 

module.exports = app;
