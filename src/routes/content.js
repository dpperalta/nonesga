import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

// Import of functions
import {
    createContent,
    getAllContent,
    getContentBySubject,
    changeActivationContent,
    updateContent,
    deleteContent
} from '../controllers/content.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createContent);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getAllContent);

// Routes with paramas
router.get('/subject/:subjectID', mAuth.tokenValidation, getContentBySubject);
router.post('/:contentID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationContent);
router.put('/:contentID', [mAuth.tokenValidation, mAuth.teacherValidation], updateContent);
router.delete('/:contentID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteContent);

export default router;