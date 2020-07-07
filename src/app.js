import express, { json } from 'express';
import morgan from 'morgan';

// Import routes
/*
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';
*/
import roleRoutes from './routes/role';

// Starts application
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(json()); // Para no utilizar el body parser, si hay errores instalar bodyParser como antes

// Routes
app.use('/api/v0.1/role', roleRoutes);
//app.use('/api/project', projectRoutes); //Sugerencia utilizar versión de API '/api/v0.1/project'
//app.use('/api/task', taskRoutes);

export default app;