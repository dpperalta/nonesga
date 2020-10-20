import app from './app';
import '@babel/polyfill';
require('./config/config');

const port = process.env.PORT;

async function main() {
    await app.listen(port);
    console.log('Server Runing on PORT ' + port);
}

main();