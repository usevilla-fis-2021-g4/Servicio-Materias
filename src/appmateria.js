const express = require('express');
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 1600);

//middlewares 
app.use(cors());
app.use(express.json());

//routes
app.use('/api/materias', require('./routes/materias'));

module.exports = app;