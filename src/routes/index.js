import express from 'express';
require('../config/config');

// Import rouytes
import roleRoutes from './role';
import personTypeRoutes from './personType';
import personRoutes from './person';
import collegeRoutes from './college';
import userRoutes from './user';
import loginRoutes from './login';
import countryRoutes from './country';
import provinceRoutes from './province';
import cityRoutes from './city';
import addressRoutes from './address';
import phoneOperatorRoutes from './phoneOperator';
import telephoneRoutes from './telephone';
import teacherRoutes from './teacher';
import studentRoutes from './student';
import courseRoutes from './course';
import contentRoutes from './content';
import subjectRoutes from './subject';
import taskRoutes from './task';
import enrollmentStatusRoutes from './enrollmentStatus';
import academicPeriodRoutes from './academicPeriod';
import enrollmentRoutes from './enrollment';

const app = express();

// Setting URL
const API = require('../config/config').API;
let url = API;

// Routes
app.use(url + '/role', roleRoutes);
app.use(url + '/personType', personTypeRoutes);
app.use(url + '/person', personRoutes);
app.use(url + '/college', collegeRoutes);
app.use(url + '/user', userRoutes);
app.use(url + '/login', loginRoutes);
app.use(url + '/country', countryRoutes);
app.use(url + '/province', provinceRoutes);
app.use(url + '/city', cityRoutes);
app.use(url + '/address', addressRoutes);
app.use(url + '/phoneOperator', phoneOperatorRoutes);
app.use(url + '/telephone', telephoneRoutes);
app.use(url + '/teacher', teacherRoutes);
app.use(url + '/student', studentRoutes);
app.use(url + '/course', courseRoutes);
app.use(url + '/content', contentRoutes);
app.use(url + '/subject', subjectRoutes);
app.use(url + '/task', taskRoutes);
app.use(url + '/enrollmentStatus', enrollmentStatusRoutes);
app.use(url + '/academicPeriod', academicPeriodRoutes);
app.use(url + '/enrollment', enrollmentRoutes);

module.exports = app;