import { Router } from 'express';
import { check } from 'express-validator';

import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createAcademicPeriod,
    getAcademicPeriods,
    getAcademicPeriod,
    changeActivationAcademicPeriod,
    updateAcademicPeriod,
    deleteAcademicPeriod
} from '../controllers/academicPeriod.controller';

import { fieldValidation } from '../middlewares/fieldValidation';

// Routes without params
router.post(
    '/', [
        check('startPeriod', 'Start period must be a date').isDate(),
        check('endPeriod', 'End period must be a date').isDate(),
        check('periodName', 'Period name is required').not().isEmpty(),
        check('detail', 'Details for academic period are required').not().isEmpty(),
        fieldValidation,
        mAuth.tokenValidation,
        mAuth.adminValidation
    ],
    createAcademicPeriod
);
router.get('/', mAuth.tokenValidation, getAcademicPeriods);

// Routes with params
router.get('/:periodID', mAuth.tokenValidation, getAcademicPeriod);
router.post('/:periodID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationAcademicPeriod);
router.put('/:periodID', [mAuth.tokenValidation, mAuth.adminValidation], updateAcademicPeriod);
router.delete('/:periodID', [mAuth.tokenValidation, mAuth.adminValidation], deleteAcademicPeriod);

export default router;

/*import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {createCity,
        getCity,
        getCities,
        updateCity,
        changeActivationCity,
        deleteCity,
        getCitiesProvince } from '../controllers/city.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCity);
router.get('/', mAuth.tokenValidation, getCities);

// Routes with params
router.get('/:cityID', mAuth.tokenValidation, getCity);
router.put('/:cityID', [ mAuth.tokenValidation, mAuth.adminValidation ], updateCity);
router.post('/:cityID', [ mAuth.tokenValidation, mAuth.adminValidation ], changeActivationCity);
router.delete('/:cityID', [ mAuth.tokenValidation, mAuth.superAdminValidation ], deleteCity);
router.get('/province/:provinceID', mAuth.tokenValidation, getCitiesProvince);

export default router;*/