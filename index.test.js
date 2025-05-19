// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test('GET /musicians request is successful', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    });

    test('GET /musicians returns all musicians', async () => {
        const musicians = await Musician.findAll();
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.text);

        const musiciansJSON = musicians.map(musician => {
            const musicianJSON = musician.toJSON();
            musicianJSON.createdAt = musicianJSON.createdAt.toISOString();
            musicianJSON.updatedAt = musicianJSON.updatedAt.toISOString();
            return musicianJSON;
        });

        expect(responseData).toEqual(musiciansJSON);
    });
})

describe('./bands endpoint', () => {
    test('GET /bands request is successful', async () => {
        const response = await request(app).get('/bands');
        expect(response.statusCode).toBe(200);
    });

    test('GET /bands returns all bands', async () => {
        const bands = await Band.findAll();
        const response = await request(app).get('/bands');
        const responseData = JSON.parse(response.text);

        const bandsJSON = bands.map(band => {
            const bandJSON = band.toJSON();
            bandJSON.createdAt = bandJSON.createdAt.toISOString();
            bandJSON.updatedAt = bandJSON.updatedAt.toISOString();
            return bandJSON;
        });

        expect(responseData).toEqual(bandsJSON);
    });
})

describe('./musicians/:id endpoint', () => {
    test('GET /musicians/:id request is successful', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.statusCode).toBe(200);
    });

    test('GET /musicians/4 returns an error', async () => {
        const response = await request(app).get('/musicians/4');
        expect(response.statusCode).toBe(404);
    });
});
