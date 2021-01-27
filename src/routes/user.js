import { Router } from 'express';
import { check } from 'express-validator';

import {
    createDefaultUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    changeActivationUser,
    createUser,
    getCollegeUser
} from '../controllers/user.controller';
import { fieldValidation } from '../middlewares/fieldValidation';

const router = Router();

const mAuth = require('../middlewares/authentication');

// Routes without params
router.post('/', [
    check('email', 'eMail is invalid').isEmail(),
    check('pass', 'Pasword must be longer than 6 characters').isLength({ min: 6 }),
    fieldValidation,
    //mAuth.tokenValidation
], createDefaultUser);
router.get('/', mAuth.tokenValidation, getUsers);
router.post('/create', [
    check('email', 'eMail is invalid').isEmail(),
    check('pass', 'Pasword must be longer than 6 characters').isLength({ min: 6 }),
    check('roleID', 'Role is required').not().isEmpty(),
    fieldValidation,
    mAuth.tokenValidation,
    mAuth.adminValidation
], createUser);

// Routes with params
router.get('/:userID', mAuth.tokenValidation, getUser);
router.put('/:userID', mAuth.tokenValidation, updateUser);
router.delete('/:userID', [mAuth.tokenValidation, mAuth.adminValidation], deleteUser);
router.post('/:userID?', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationUser);
router.get('/college/:collegeID', getCollegeUser);

export default router;