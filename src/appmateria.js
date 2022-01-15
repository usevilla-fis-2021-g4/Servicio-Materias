const express = require('express');
const cors = require('cors');
require('dotenv').config();
var bodyParser = require("body-parser");
const passport = require('passport');
require('../passport');

//
const app = express();

//Lectura y Parseo del body
app.use(express.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

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