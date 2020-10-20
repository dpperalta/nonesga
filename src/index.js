import app from './app';
import '@babel/polyfill';
//require('./config/config');
import config from './config/config';

const port = process.env.PORT;
console.log('port', port);

async function main() {
    //await app.listen(port);
    await app.listen(port);
    console.log('Server Runing on PORT ' + port);
}

main();