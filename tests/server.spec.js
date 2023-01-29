const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes/ GET ", () => {

//1
    test("Obteniendo un error 200 y tipo de dato array con un objeto", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(1);
    });

//2
    test('se obtiene un error 404 al intentar eliminar un cafe que no existe', async () => {
        const jwt = 'Token';
        const idDelete = 7;
        const response = await request(server)
            .delete(`/cafes/${idDelete}`)
            .set("Authorization", jwt)
            .send();
        expect(response.status).toBe(404);
    });
});

//3

describe("Operaciones CRUD de cafes/ POST", () => {
    describe("agrega un nuevo cafe", () => {
        const newCaffe = {
            id: 10, nombre: "expreso"
        };
        test("devuelve un  codigo 201", async () => {
            const response = await request(server).post("/cafes").send(newCaffe);
            expect(response.statusCode).toBe(201);
        });
    });
});


//4
describe("Operaciones CRUD de cafes/ PUT", () => {
    test("devuelve un 400 si se actualiza un cafe enviando un id diferente al id dentro del payload", async () => {
        const id = 10;
        const payload = { id: id, nombre: "intenso" };
        const response = await request(server).put(`/cafes/${id}`).send(payload);
        expect(response.status).toBe(400);
    });
});

