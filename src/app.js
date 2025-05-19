const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (request, response) => {
    const musicians = await Musician.findAll();
    response.json(musicians);
})

app.get("/bands", async (request, response) => {
    const bands = await Band.findAll();
    response.json(bands);
})

app.get("/musicians/:id", async (request, response) => {
    const musician = await Musician.findByPk(request.params.id);
    response.json(musician);
})


module.exports = app;