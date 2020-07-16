import { Router } from 'express';
import {
    createPersonType,
    getPersonTypes,
    getActivePersonTypes,
    updatePersonType,
    inactivatePersonType,
    activatePersonType,
    deletePersonType
} from '../controllers/personType.controller';

const router = Router();

const mAuth = require('../middlewares/authentication');

// Routes without params 
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createPersonType);
router.get('/', mAuth.tokenValidation, getPersonTypes);
router.get('/active', mAuth.tokenValidation, getActivePersonTypes);

// Routes with params
router.put('/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], updatePersonType);
router.put('/inactivate/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], inactivatePersonType);
router.put('/activate/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], activatePersonType);
router.delete('/:personTypeID', [mAuth.tokenValidation, mAuth.superAdminValidation], deletePersonType);

export default router;