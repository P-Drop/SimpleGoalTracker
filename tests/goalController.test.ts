
import request from 'supertest'
import { app } from '../src/app.js';

// Probar GET /goals
describe ('GET /goals', () => {
    it('devuelve 200 y un array de metas', async () => {
        const res = await request(app).get('/goals');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

// Probar GET /goals/:id
describe ('GET /goals/:id', () => {
    it('devuelve 200 y la meta cuando el id existe', async () => {
        const res = await request(app).get('/goals/g1');
        expect(res.status).toBe(200);
        expect(res.body.id).toBe('g1');
    });

    it('devuelve 404 cuando el id no existe', async () => {
        const res = await request(app).get('/goals/no-existe');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Meta no encontrada' });
    });
});
// Probar POST /goals
describe('POST /goals', () => {
    const validData = {
        id: "g4",
        title: "Dominar TypeScript y Zod",
        description: "Completar la implementación de la API con validaciones robustas.",
        timeline: {
            startDate: "2026-06-18T00:00:00Z",
            endDate: "2026-06-25T00:00:00Z"
        },
        isCompleted: false
    };

    const invalidData = {
        name: "Dani", //
        description: "Esto es una prueba",
        timeline: {
            startDate: "2026-06-18T00:00:00Z",
            endDate: "2026-06-25T00:00:00Z"
        },
        isCompleted: false
    };

    it('devuelve 201 cuando los datos enviados son compatibles con el esquema Goal', async () => {
        const res = await request(app).post('/goals').send(validData);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(validData.title);
    });

    it('devuelve 400 cuando el body no es compatible con el esquema Goal', async () => {
        const res = await request(app).post('/goals').send(invalidData);
        expect(res.status).toBe(400);
    });
});