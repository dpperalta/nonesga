import { Router } from 'express';
import { check } from 'express-validator';

import {
    createCollege,
    getColleges,
    changeActivationCollege,
    getStatusColleges,
    getCollege,
    updateCollege,
    deleteCollete
} from '../controllers/college.controller';
import { fieldValidation } from '../middlewares/fieldValidation';

const router = Router();

const mAuth = require('../middlewares/authentication');

// Routes without params
router.post('/', [
        check('collegeName', 'College name is required').not().isEmpty(),
        check('collegeShowName', 'College show name is required').not().isEmpty(),
        fieldValidation,
        mAuth.tokenValidation,
        mAuth.adminValidation
    ],
    createCollege);
router.get('/', mAuth.tokenValidation, getColleges);

// Routes with params
router.post('/:collegeID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationCollege);
router.get('/type/:type', mAuth.tokenValidation, getStatusColleges);
router.get('/:collegeID', mAuth.tokenValidation, getCollege);
router.put('/:collegeID', [
    check('collegeName', 'College name is required').not().isEmpty(),
    check('collegeShowName', 'College show name is required').not().isEmpty(),
    fieldValidation,
    mAuth.tokenValidation,
    mAuth.adminValidation
], updateCollege);
router.delete('/:collegeID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteCollete);

export default router;