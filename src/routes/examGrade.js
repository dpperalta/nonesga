import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExamGrade,
    getExamGrades,
    getExamGradeByID,
    getExamGradesByStudent,
    getExamGradesByStudentAndExam,
    getExamGradesByTeacher,
    getExamGradesByTeacherAndExam,
    updateExamGrade,
    deleteExamGrade
} from '../controllers/examGrade.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExamGrade);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getExamGrades);

// Routes with params
router.get('/:examGradeID', [mAuth.tokenValidation], getExamGradeByID);
router.get('/student/:studentID', mAuth.tokenValidation, getExamGradesByStudent);
router.get('/student/:studentID/exam/:examID', mAuth.tokenValidation, getExamGradesByStudentAndExam);
router.get('/teacher/:teacherID', [mAuth.tokenValidation, mAuth.teacherValidation], getExamGradesByTeacher);
router.get('/teacher/:teacherID/exam/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], getExamGradesByTeacherAndExam);
router.put('/:examGradeID', [mAuth.tokenValidation, mAuth.teacherValidation], updateExamGrade);
router.delete('/:examGradeID', [mAuth.tokenValidation, mAuth.adminValidation], deleteExamGrade);

export default router;