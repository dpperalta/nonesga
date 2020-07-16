import { Router } from 'express';

import { createDefaultUser, getUsers } from '../controllers/user.controller';

const router = Router();

const mAuth = require('../middlewares/authentication');

// Routes without params
router.post('/', mAuth.tokenValidation, createDefaultUser);
router.get('/', getUsers);

export default router;
/*
import { Router } from 'express';

import {
    createCollege,
    getColleges,
    changeActivationCollege,
    getStatusColleges,
    getCollege,
    updateCollege,
    deleteCollete
} from '../controllers/college.controller';

const router = Router();

// Routes without params
router.post('/', createCollege);
router.get('/', getColleges);

// Routes with params
router.post('/:collegeID', changeActivationCollege);
router.get('/type/:type', getStatusColleges);
router.get('/:collegeID', getCollege);
router.put('/:collegeID', updateCollege);
router.delete('/:collegeID', deleteCollete);

export default router;
*/