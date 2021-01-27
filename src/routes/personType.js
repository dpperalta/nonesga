import { Router } from 'express';
import { check } from 'express-validator';
import {
    createPersonType,
    getPersonTypes,
    getActivePersonTypes,
    updatePersonType,
    inactivatePersonType,
    activatePersonType,
    deletePersonType
} from '../controllers/personType.controller';
import { fieldValidation } from '../middlewares/fieldValidation';

const router = Router();

const mAuth = require('../middlewares/authentication');

// Routes without params 
router.post('/', [
        check('typeName', 'Person Type name is required').not().isEmpty(),
        fieldValidation,
        mAuth.tokenValidation,
        mAuth.adminValidation
    ],
    createPersonType
);
router.get('/', mAuth.tokenValidation, getPersonTypes);
router.get('/active', mAuth.tokenValidation, getActivePersonTypes);

// Routes with params
router.put('/:personTypeID', [
        check('typeName', 'Person Type name is required').not().isEmpty(),
        fieldValidation,
        mAuth.tokenValidation,
        mAuth.adminValidation
    ],
    updatePersonType);
router.put('/inactivate/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], inactivatePersonType);
router.put('/activate/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], activatePersonType);
router.delete('/:personTypeID', [mAuth.tokenValidation, mAuth.superAdminValidation], deletePersonType);

export default router;