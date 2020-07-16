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

const mAuth = require('../middlewares/authentication');

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCollege);
router.get('/', mAuth.tokenValidation, getColleges);

// Routes with params
router.post('/:collegeID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationCollege);
router.get('/type/:type', mAuth.tokenValidation, getStatusColleges);
router.get('/:collegeID', mAuth.tokenValidation, getCollege);
router.put('/:collegeID', [mAuth.tokenValidation, mAuth.adminValidation], updateCollege);
router.delete('/:collegeID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteCollete);

export default router;