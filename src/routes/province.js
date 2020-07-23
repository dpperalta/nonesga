import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {createProvince,
        getProvinces,
        getProvince,
        updateProvince,
        changeActivationProvince,
        deleteProvince } from '../controllers/province.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createProvince);
router.get('/', mAuth.tokenValidation, getProvinces);

// Routes with params
router.get('/:provinceID', mAuth.tokenValidation, getProvince);
router.put('/:provinceID', [ mAuth.tokenValidation, mAuth.adminValidation ], updateProvince);
router.post('/:provinceID', [ mAuth.tokenValidation, mAuth.adminValidation ], changeActivationProvince);
router.delete('/:provinceID', [ mAuth.tokenValidation, mAuth.superAdminValidation ], deleteProvince);

export default router;