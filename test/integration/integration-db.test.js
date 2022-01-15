const Materia = require('../../src/models/materia.js');
const mongoose = require('mongoose');
const dbConnect = require('../../src/database.js');

describe('Materias DB connection', () => {

    beforeAll(() => {
        return dbConnect();
    });

    beforeEach((done) => {
        Materia.deleteMany({}, (err) => {
            done();
        });
    });

    it("writes a materia in the DB", (done) => {    
        const materia = new Materia(
            {
                nombre: 'TEST',
                descripcion: 'TEST',
                area: 'TEST'
            }
        );

        materia.save((err, materia) => {
            expect(err).toBeNull();
            Materia.find({}, (err2, materias) => {
                expect(materias);
                done();
            });
        });
    });



it("not writes a materia in the DB with null nombre", (done) => {
    const materia = new Materia(
        {
            nombre: "",
            descripcion: "DB test",
            area: "DB test"
        }
    );

    materia.save((err, materia) => {
        err_message = "Materia validation failed: nombre: Path `nombre` is required."
        expect(err.message).toEqual(err_message);
        done();
    });
});

it("not writes a materia in the DB with null descripcion", (done) => {
    const materia = new Materia(
        {
            nombre: "DB test",
            descripcion: "",
            area: "DB test"
        }
    );

    materia.save((err, materia) => {
        err_message = "Materia validation failed: descripcion: Path `descripcion` is required."
        expect(err.message).toEqual(err_message);
        done();
    });
});

it("not writes a materia in the DB with null area", (done) => {
    const materia = new Materia(
        {
            nombre: "DB test",
            descripcion: "DB test",
            area: ""
        }
    );

    materia.save((err, materia) => {
        err_message = "Materia validation failed: area: Path `area` is required."
        expect(err.message).toEqual(err_message);
        done();
    });
});

afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(done);
    });
});
});