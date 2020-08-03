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
    Test only for dnone branch
*/