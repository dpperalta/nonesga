import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

// Import of functions
import {
    createSubject,
    getSubjects,
    getSubject,
    changeActivationSubject,
    updateSubject,
    deleteSubject
} from '../controllers/subject.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createSubject);
router.get('/', [mAuth.tokenValidation], getSubjects);

// Routes with paramas
router.get('/:subjectID', mAuth.tokenValidation, getSubject);
router.put('/:subjectID', [mAuth.tokenValidation, mAuth.adminValidation], updateSubject);
router.post('/:subjectID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationSubject);
router.delete('/:subjectID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteSubject);

export default router;