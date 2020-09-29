import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createEnrollmentStatus,
    getAllEnrollmentStatus,
    updateEnrollmentStatus,
    getEnrollmentStatus,
    changeActivationEnrollmentStatus,
    deleteEnrollmentStatus
} from '../controllers/enrollmentStatus.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createEnrollmentStatus);
router.get('/', mAuth.tokenValidation, getAllEnrollmentStatus);

// Routes with params
router.put('/:statusID', [mAuth.tokenValidation, mAuth.adminValidation], updateEnrollmentStatus);
router.get('/:statusID', mAuth.tokenValidation, getEnrollmentStatus);
router.post('/:statusID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationEnrollmentStatus);
router.delete('/:statusID', [mAuth.tokenValidation, mAuth.adminValidation], deleteEnrollmentStatus);

export default router;