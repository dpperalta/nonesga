import express from 'express';
require('../config/config');

// Import rouytes
import roleRoutes from './role';
import personTypeRoutes from './personType';
import personRoutes from './person';
import collegeRoutes from './college';

const app = express();

// Setting URL
const API = require('../config/config').API;
let url = API;

// Routes
app.use(url + '/role', roleRoutes);
app.use(url + '/personType', personTypeRoutes);
app.use(url + '/person', personRoutes);
app.use(url + '/college', collegeRoutes);

module.exports = app;