const express = require("express");
const musicianRouter = require("express").Router();
const { Musician } = require("../models/index")
const { check, validationResult } = require("express-validator");

const { db } = require("../db/connection")

musicianRouter.use(express.json());
musicianRouter.use(express.urlencoded());

//TODO: Create a GET /musicians route to return all musicians 

musicianRouter.get("/", async (request, response) => {
    const musicians = await Musician.findAll();
    response.json(musicians);
})

musicianRouter.get("/:id", async (request, response) => {
    const musician = await Musician.findByPk(request.params.id);
    if (!musician) {
        return response.status(404).json({ error: "Musician not found" });
    }
    response.json(musician);
})

musicianRouter.post("/",
    [
        check("name").not().isEmpty().trim(),
        check("instrument").not().isEmpty().trim(),
    ], 
    async (request, response) => {
        errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.json({ errors: errors.array() });
        }

        const musician = await Musician.create(request.body);

        response.json(musician);
})

musicianRouter.put("/:id", async (request, response) => {
    const musicianId = request.params.id;
    const musician = await Musician.update(request.body, {
        where: { id: musicianId }
    });
    if (!musician || musician[0] === 0) {
        return response.status(404).json({ error: "Musician not found" });
    }
    response.json(musician);
})

musicianRouter.delete("/:id", async (request, response) => {
    const musicianId = request.params.id;
    const musician = await Musician.destroy({
        where: { id: musicianId }
    });
    if (!musician) {
        return response.status(404).json({ error: "Musician not found" });
    }
    response.json(musician);
})

module.exports = musicianRouter;