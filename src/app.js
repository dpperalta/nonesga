import express, { json } from 'express';
import morgan from 'morgan';

// Import routes
import roleRoutes from './routes/role';
import personTypeRoutes from './routes/personType';
import person from './routes/person';

// Starts application
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(json()); // Para no utilizar el body parser, si hay errores instalar bodyParser como antes

// Routes
app.use('/api/v0.1/role', roleRoutes);
app.use('/api/v0.1/personType', personTypeRoutes);
app.use('/api/v0.1/person', person);

export default app;