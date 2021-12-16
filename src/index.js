require('dotenv').config();
const app = require('./appmateria');
require('./database');

async function main() {
    await app.listen(app.get('port'));
    console.log('Server up on port: ', app.get('port'));
}


main();