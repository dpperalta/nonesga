import { Router } from 'express';

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

const router = Router();

const mAuth = require('../middlewares/authentication');

// Routes without params
router.post('/', mAuth.tokenValidation, createDefaultUser);
router.get('/', mAuth.tokenValidation, getUsers);
router.post('/create', [mAuth.tokenValidation, mAuth.adminValidation], createUser);

// Routes with params
router.get('/:userID', mAuth.tokenValidation, getUser);
router.put('/:userID', mAuth.tokenValidation, updateUser);
router.delete('/:userID', [mAuth.tokenValidation, mAuth.adminValidation], deleteUser);
router.post('/:userID?', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationUser);
router.get('/college/:collegeID', getCollegeUser);

export default router;