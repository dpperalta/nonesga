import { Router } from 'express';

import {
    createRole,
    getRoles,
    getActiveRolesWitoutCounter,
    updateRole,
    getActiveRolesWithCounter,
    inactivateRole,
    activateRole,
    deleteRole
} from '../controllers/role.controller';

import { check } from 'express-validator';

import { fieldValidation } from '../middlewares/fieldValidation';
const mAuth = require('../middlewares/authentication');

const router = Router();

//Crete routes
router.post('/', [
        check('roleName', 'Role name is requirede').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        fieldValidation,
        mAuth.tokenValidation,
        mAuth.superAdminValidation
    ],
    createRole
);

router.get('/', [mAuth.tokenValidation, mAuth.superAdminValidation], getRoles);
router.get('/number', [mAuth.tokenValidation, mAuth.superAdminValidation], getActiveRolesWithCounter);
router.get('/active', mAuth.tokenValidation, getActiveRolesWitoutCounter);

// Routes with params
router.put(
    '/:roleID', [
        check('roleName', 'Role name is requirede').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        fieldValidation,
        mAuth.tokenValidation,
        mAuth.superAdminValidation
    ],
    updateRole);
router.put('/inactivate/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], inactivateRole);
router.put('/activate/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], activateRole);
router.delete('/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteRole);

export default router;