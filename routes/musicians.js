const express = require("express");
const app = express();
const route = require("express").Router();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

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
    if (!musician) {
        return response.status(404).json({ error: "Musician not found" });
    }
    response.json(musician);
})

app.post("/musicians", async (request, response) => {
    if(!request.body || Object.keys(request.body).length === 0) {
        return response.status(400).json({ error: "Invalid request body" });
    }

    const musician = await Musician.create(request.body);

    console.log(request.body);
    response.json(musician);
})

app.put("/musicians/:id", async (request, response) => {
    const musicianId = request.params.id;
    const musician = await Musician.update(request.body, {
        where: { id: musicianId }
    });
    if (!musician || musician[0] === 0) {
        return response.status(404).json({ error: "Musician not found" });
    }
    response.json(musician);
})

app.delete("/musicians/:id", async (request, response) => {
    const musicianId = request.params.id;
    const musician = await Musician.destroy({
        where: { id: musicianId }
    });
    if (!musician) {
        return response.status(404).json({ error: "Musician not found" });
    }
    response.json(musician);
})

module.exports = app;