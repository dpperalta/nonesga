import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createTelephone,
    getTelephones,
    getTelephone,
    updateTelephone,
    deleteTelephone,
    changeActivationTelephone
} from '../controllers/telephone.controller';


// Routes without params
router.post('/', mAuth.tokenValidation, createTelephone);
router.get('/', mAuth.tokenValidation, getTelephones);

// Routes with params
router.get('/:telephoneID', mAuth.tokenValidation, getTelephone);
router.put('/:telephoneID', mAuth.tokenValidation, updateTelephone);
router.delete('/:telephoneID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteTelephone);
router.post('/:telephoneID', mAuth.tokenValidation, changeActivationTelephone);


export default router;

/*
import { Router } from 'express';

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

export default router;
*/