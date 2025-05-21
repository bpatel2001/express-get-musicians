const express = require("express");
const app = express();

const musicianRouter = require("../routes/musicians.js");

app.use("/musicians", musicianRouter);

module.exports = app;