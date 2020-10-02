import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createEnrollment,
    getEnrollments,
    getEnrollment,
    getEnrollmentByParameter,
    getEnrollmentByCollege,
    getEnrollmentByDNI,
    updateEnrollment,
    updateProcessEnrollment,
    deleteEnrollment
} from '../controllers/enrollment.controller';

// Routes without params
router.post('/', mAuth.tokenValidation, createEnrollment);
router.get('/', mAuth.tokenValidation, getEnrollments);

// Routes with params
router.get('/:enrollmentID', mAuth.tokenValidation, getEnrollment);
router.get('/parameter/:valueID', mAuth.tokenValidation, getEnrollmentByParameter);
router.get('/college/:collegeID', mAuth.tokenValidation, getEnrollmentByCollege);
router.get('/dni/:dni', mAuth.tokenValidation, getEnrollmentByDNI);
router.put('/:enrollmentID', [mAuth.tokenValidation, mAuth.adminValidation], updateEnrollment);
router.put('/process/:enrollmentID', mAuth.tokenValidation, updateProcessEnrollment);
router.delete('/:enrollmentID', [mAuth.tokenValidation, mAuth.adminValidation], deleteEnrollment);

export default router;