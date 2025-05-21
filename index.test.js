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

    test('POST /musicians request is successful', async () => {
        const response = await request(app).post('/musicians').send(seedMusician[0]);
        expect(response.statusCode).toBe(200);
    });

    test ('POST /musicians returns an error', async () => {
        const response = await request(app).post('/musicians');
        expect(response.statusCode).toBe(400);
    })

    test('POST /musicians creates a new musician', async () => {
        const response = await request(app).post('/musicians').send(seedMusician[0]);
        const musician = await Musician.findByPk(response.body.id);
        expect(musician).toBeTruthy();
    });
})

describe('./bands endpoint', () => {
    test('GET /bands request is successful', async () => {
        const response = await request(app).get('/bands');
        expect(response.statusCode).toBe(200);
    });
})

describe('./musicians/:id endpoint', () => {
    test('GET /musicians/:id request is successful', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.statusCode).toBe(200);
    });

    test('GET /musicians/:id returns an error', async () => {
        const response = await request(app).get('/musicians/10');
        expect(response.statusCode).toBe(404);
    });

    test('PUT /musicians/:id request is successful', async () => {
        const response = await request(app).put('/musicians/1').send({ name: 'John Doe' });
        expect(response.statusCode).toBe(200);
    });

    test('PUT /musicians/:id updates a musician', async () => {
        const response = await request(app).put('/musicians/1').send({ name: 'John Doe' });
        const musician = await Musician.findByPk(1);
        expect(musician.name).toBe('John Doe');
    });

    test('PUT /musicians/:id returns an error', async () => {
        const response = await request(app).put('/musicians/10').send({ name: 'John Doe' });
        expect(response.statusCode).toBe(404);
    });

    test('DELETE /musicians/:id request is successful', async () => {
        const response = await request(app).delete('/musicians/1');
        expect(response.statusCode).toBe(200);
    });

    test('DELETE /musicians/:id deletes a musician', async () => {
        const response = await request(app).delete('/musicians/1');
        const musician = await Musician.findByPk(1);
        expect(musician).toBeFalsy();
    });

    test('DELETE /musicians/:id returns an error', async () => {
        const response = await request(app).delete('/musicians/10');
        expect(response.statusCode).toBe(404);
    });
});
