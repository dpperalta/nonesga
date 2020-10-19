import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createCanton,
    getCantons,
    getCanton,
    getCantonsProvince,
    updateCanton,
    changeActivationCanton,
    deleteCanton
} from '../controllers/canton.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCanton);
router.get('/', mAuth.tokenValidation, getCantons);

// Routes with params
router.get('/:cantonID', mAuth.tokenValidation, getCanton);
router.get('/province/:provinceID', mAuth.tokenValidation, getCantonsProvince);
router.put('/:cantonID', [mAuth.tokenValidation, mAuth.adminValidation], updateCanton);
router.post('/:cantonID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationCanton);
router.delete('/:cantonID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteCanton);


export default router;
/*
import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {createCanton,
        getCanton,
        getCantons,
        updateCanton,
        changeActivationCanton,
        deleteCanton,
        getCantonsProvince } from '../controllers/canton.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCanton);
router.get('/', mAuth.tokenValidation, getCantons);

// Routes with params
router.get('/:cantonID', mAuth.tokenValidation, getCanton);
router.put('/:cantonID', [ mAuth.tokenValidation, mAuth.adminValidation ], updateCanton);
router.post('/:cantonID', [ mAuth.tokenValidation, mAuth.adminValidation ], changeActivationCanton);
router.delete('/:cantonID', [ mAuth.tokenValidation, mAuth.superAdminValidation ], deleteCanton);


export default router;
*/