import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExamGrade,
    getExamGrades,
    getExamGradeByID
} from '../controllers/examGrade.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExamGrade);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getExamGrades);

// Routes with params
router.get('/:examGradeID', [mAuth.tokenValidation], getExamGradeByID);

export default router;