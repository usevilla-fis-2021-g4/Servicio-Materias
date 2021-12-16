const mongoose = require('mongoose');

//const URI = "mongodb://localhost:27017/materiasDB";
const URI = "mongodb://mongodb:27017";

mongoose.connect(URI);

const conection = mongoose.connection;

conection.once('open', () =>{
    console.log('DB Up');
});