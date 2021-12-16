require('dotenv').config();
const req = require('express/lib/request');
const app = require('./appmateria');
require('./database');
var BASE_API_PATH = "/api/v1";
async function main() {
    await app.listen(app.get('port'));
    console.log('Server up on port: ', app.get('port'));
}

app.get(BASE_API_PATH + "/healthz", (req, res) => {
    
    res.sendStatus(200);

});


main();