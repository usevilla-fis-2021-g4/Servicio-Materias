const { Router } = require('express');
const router = Router();
const passport= require('passport');
require('../../passport');

const { getMaterias, createMateria, getMateria, deleteMateria, updateMateria } = require('../controllers/materia.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    Materias:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: El nombre de la materia.
 *        descripcion:
 *          type: string
 *          description: La descripcion de la materia.
 *        area:
 *          type: string
 *          description: El área de la materia.
 *      required:
 *        - nombre
 *        - descripcion
 *        - area
 *      example:
 *        nombre: Finanzas
 *        descripcion: FIZ-004
 *        area: Matemáticas
 *  securitySchemes:
 *    ApiKeyAuth:       # arbitrary name for the security scheme
 *      type: apiKey
 *      in: header       # can be "header", "query" or "cookie"
 *      name: apikey    # name of the header, query parameter or cookie
 *  
 *  responses:
 *    UnauthorizedError:
 *      description: API key es invalida o está ausente.
 *        
 */


////////////////////////////////GET MATERIAS///////////////////////////////
/**
 * @swagger
 * /apimaterias/v1/materias:
 *    get:
 *      summary: Retorna todas las materias.
 *      tags: [Materia]
 *      responses:
 *        400: 
 *          description: Error al intentar consultar las materias.
 *        200: 
 *          description: Materias consultadas con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Materias'
 */


//////////////////////POST MATERIAS////////////////////////
/**
 * @swagger
 * /apimaterias/v1/materias:
 *    post:
 *      summary: Crea una nueva materia
 *      tags: [Materia]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Materias'
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        400: 
 *          description: Error al intentar crear la Materia.
 *        500: 
 *          description: Error al intentar crear la Materia (Problemas con el servidor).
 *        201: 
 *          description: Materia creada.
 *      security:
 *        - ApiKeyAuth: []
 */


///////////////////GET MATERIA POR ID////////////////////////
/**
 * @swagger
 * /apimaterias/v1/materias/{id}:
 *    get:
 *      summary: Retorna una materia al dar un ID de la materia.
 *      tags: [Materia]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la Materia correspondiente en la Base de Datos.
 *      responses:
 *        500: 
 *          description: Error al intentar consultar la materia (problemas con el servidor).
 *        404: 
 *          description: Materia no encontrada.
 *        200: 
 *          description: Materia consultada con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Materias'
 */


///////////////////////////////PUT MATERIA//////////////////////////
/**
 * @swagger
 * /apimaterias/v1/materias/{id}:
 *    put:
 *      summary: Actualiza una materia al recibir un id válido.
 *      tags: [Materia]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la Materia.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Materias'
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar actualizar la materia (problemas con el servidor).
 *        404: 
 *          description: Materia no encontrada.
 *        409: 
 *          description: La identificación ya está registrada.
 *        201: 
 *          description: Materia actualizada con éxito.
 *          content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Materias'
 *      security:
 *        - ApiKeyAuth: []
 */




////////////////////DELETE MATERIA///////////////////
/**
 * @swagger
 * /apimaterias/v1/materias/{id}:
 *    delete:
 *      summary: Elimina una materia al dar el ID de la materia.
 *      tags: [Materia]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Id de la materia correspondiente en la Base de Datos.
 *      responses:
 *        401: 
 *          $ref: '#/components/responses/UnauthorizedError'
 *        500: 
 *          description: Error al intentar eliminar la materia (problemas con el servidor).
 *        404: 
 *          description: Materia no encontrada.
 *        204: 
 *          description: Materia eliminada con éxito.
 *      security:
 *        - ApiKeyAuth: []
 */
router.route('/')
 .get(getMaterias)
 .post(passport.authenticate("localapikey", {session: false}),createMateria);

router.route('/:id')
 .get(getMateria)
 .delete(passport.authenticate("localapikey", {session: false}),deleteMateria)
 .put(passport.authenticate("localapikey", {session: false}),updateMateria);

module.exports = router;