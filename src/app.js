import express, { json } from 'express';
import morgan from 'morgan';
require('dotenv').config();

// Starts application
const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, none-token");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(json()); // Para no utilizar el body parser, si hay errores instalar bodyParser como antes

// Importing the Routes File
app.use(require('./routes/index'));

export default app;