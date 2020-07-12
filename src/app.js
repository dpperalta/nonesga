import express, { json } from 'express';
import morgan from 'morgan';

// Starts application
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(json()); // Para no utilizar el body parser, si hay errores instalar bodyParser como antes

// Importing the Routes File
app.use(require('./routes/index'));

export default app;