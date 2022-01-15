const app = require('../src/appmateria.js');
const Materia = require('../src/models/materia.js');
const request = require('supertest');



describe("Materias API", () => {


    describe("GET /", () => {
      it("should return an HTML document", () => {
        return request(app)
          .get("/")
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.type).toEqual(expect.stringContaining("html"));
            expect(response.text).toEqual(expect.stringContaining("h1"));
          });
      });
    });
  
    describe("GET /materias", () => {
      beforeAll(() => {
        const materias = [
          {
            nombre: "1",
            descripcion: "1",
            area: "1"
          },
          {
            nombre: "2",
            descripcion: "2",
            area: "2"
          },
        ];
  
        dbFind = jest.spyOn(Materia, "find");
        dbFind.mockImplementation((query, callback) => {
          callback(null, materias);
        });
      });
  
      it("should return all materias", () => {
        return request(app)
          .get("/apimaterias/v1/materias")
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual([
                {
                    nombre: "1",
                    descripcion: "1",
                    area: "1"
                  },
                  {
                    nombre: "2",
                    descripcion: "2",
                    area: "2"
                  },
            ]);
            expect(dbFind).toBeCalledWith({}, expect.any(Function));
          });
      });


      describe("GET /materias/:id", () => {
        beforeAll(() => {
          const materia = 
            {
              _id: "619e98f2ac8738570c90a206",
              nombre: "Prueba Test GET By Id",
              descripcion: "1",
              area: "1"
            };
    
          dbFindById = jest.spyOn(Materia, "findById");
          dbFindById.mockImplementation((r, callback) => {
            callback(null, materia);
          });
        });
    
        it("should return a materia by id", () => {
          return request(app)
            .get("/apimaterias/v1/materias/619e98f2ac8738570c90a206")
            .then((response) => {
              expect(response.statusCode).toBe(200);
              expect(response.body).toStrictEqual({
                _id: "619e98f2ac8738570c90a206",
                nombre: "Prueba Test GET By Id",
                descripcion: "1",
                area: "1",
              });
              expect(dbFindById).toBeCalledWith(
                { _id: "619e98f2ac8738570c90a206" },
                expect.any(Function)
              );
            });
        });
    
        it("should not return any materia due to incorrect id", () => {
          dbFindById.mockImplementation((r, callback) => {
            callback(`CastError: Cast to ObjectId failed for value "{ _id: '661bf5c67b5a9c726fa8f4a7d' }" (type Object) at path "_id" for model "Materia"`, null);
          });
    
          return request(app)
            .get("/apimaterias/v1/materias/619e98f2ac8738570c90a205")
            .then((response) => {
              expect(response.statusCode).toBe(500);
              expect(response.body).toStrictEqual({});
              expect(dbFindById).toBeCalledWith(
                { _id: "619e98f2ac8738570c90a205" },
                expect.any(Function)
              );
            });
        });
      });
    });

    describe('POST /materias', () => {
        const materia = {
          nombre: "Prueba Test Post",
          descripcion: "123", 
          area: "123"
        };
        let dbInsert;

        beforeEach(() => {
            dbInsert = jest.spyOn(Materia, "create");
        });

        it('Should add a new contact if everything is fine', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post('/apimaterias/v1/materias').send(materia).then((response) => {
                expect(response.statusCode).toBe(201);
            });
        });

        it('Should return 500 if there is a problem with the DB', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post('/apimaterias/v1/materias').send(materia).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });


   describe("PUT /materias/:id", () => {
    const materia = {
      nombre: "Prueba Test PUT",
      descripcion: "123",
      area: "123",
    };

    beforeAll(() => {
      dbFindOneAndUpdate = jest.spyOn(Materia, "findOneAndUpdate");
      dbFindOneAndUpdate.mockImplementation((r, data, callback) => {
        callback(null, materia);
      });
    });

    it("should update a materia descripcion by id", () => {
      // Arrange
      const send_data_to_update = {
        nombre: "Prueba Test PUT",
        descripcion: "321",
        area: "123",
      };

      // Act
      return request(app)
        .put('/apimaterias/v1/materias/619e98f2ac8738570c90a207')
        .send(send_data_to_update)
        .then((response) => {
          // Assert
          expect(response.statusCode).toBe(200);
          expect(dbFindOneAndUpdate).toBeCalledWith(
            { _id:"619e98f2ac8738570c90a207" },
            send_data_to_update,
            expect.any(Function)
          );
          expect(response.body.data).toEqual(send_data_to_update);
        });
    });
  });

  describe("DELETE /materias/:id", () => {
    beforeAll(() => {
      const materia = {
        nombre: "Prueba Test DELETE",
        descripcion: "123",
        area: "123",
      };

      dbDelete = jest.spyOn(Materia, "findByIdAndDelete");
    });

    it("should delete a materia", () => {
      dbDelete.mockImplementation((r, callback) => {
        callback(false);
      });
      return request(app)
        .delete("/apimaterias/v1/materias/619e98f2ac8738570c90a208")
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(dbDelete).toBeCalledWith(
            { _id: "619e98f2ac8738570c90a208" },
            expect.any(Function)
          );
        });
    }); 

  });
});