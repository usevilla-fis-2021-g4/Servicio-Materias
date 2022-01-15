require('dotenv').config();
const app = require('./appmateria');
const dbConnect = require ('../src/database.js');

var port = (process.env.PORT || 2999);

console.log("Starting API server on port: " + port);

dbConnect().then(
  () => {
    app.listen(port);
    console.log("Server UP!");
  },
  (err) => {
    console.log("Connection error: " + err);
  })