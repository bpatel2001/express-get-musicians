const express = require("express");
const app = express();

const musicianRouter = require("../routes/musicians.js");
const bandRouter = require("../routes/bands.js");

app.use("/musicians", musicianRouter);
app.use("/bands", bandRouter);

module.exports = app;