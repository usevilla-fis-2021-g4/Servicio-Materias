const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/materiasDB";

mongoose.connect(URI);

const conection = mongoose.connection;

conection.once('open', () =>{
    console.log('DB Up');
});