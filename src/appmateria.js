const express = require('express');
const cors = require('cors');
require('dotenv').config();
var bodyParser = require("body-parser");
const passport = require('passport');
require('../passport');


//swagger documentation config
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api de Materias",
            version: "1.0.0"
        }/*,
        servers: [
            {
                url: "http://localhost:2999", 
                description: "Servidor de desarrollo en localhost"
            },
            {
                url: "https://apimaterias-mdp1997.cloud.okteto.net/", 
                description: "Servidor de despliegue de Okteto"
            }
        ]*/
    },
    apis: [`${path.join(__dirname, "./routes/materias.js")}`]
};


//
const app = express();

//Lectura y Parseo del body
app.use(express.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//swagger documentation config
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// settings
app.set('port', process.env.PORT || 2999);

//middlewares 
app.use(cors());
app.use(express.json());

//routes
app.use('/apimaterias/v1/materias', require('./routes/materias'));

//Uso del passport
app.use(passport.initialize());

//server

app.get("/", (request, response) => {
    response.send("<html><body><h1>My Server.</h1></body></html>");
});

app.get("/apimaterias/v1/healthz", (req, res) => {
    
    res.sendStatus(200);

});

module.exports = app;