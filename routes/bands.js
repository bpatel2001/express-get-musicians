const express = require("express");
const bandRouter = require("express").Router();
const { Band, Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

bandRouter.use(express.json());
bandRouter.use(express.urlencoded());

bandRouter.get("/", async (request, response) => {
    const bands = await Band.findAll({
        include: [Musician]
    });
    response.json(bands);
});

module.exports = bandRouter;