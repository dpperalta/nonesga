import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExamQuestion,
    getExamQuestions,
    getExamQuestionByID,
    getExamQuestionByExam,
    getTotalOfExamByID,
    udpateExamQuestion,
    changeActivationExamQuestion,
    deleteExamQuestion
} from '../controllers/examQuestion.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExamQuestion);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getExamQuestions);

// Routes with params
router.get('/:questionID', mAuth.tokenValidation, getExamQuestionByID);
router.get('/exam/:examID', mAuth.tokenValidation, getExamQuestionByExam);
router.get('/totals/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], getTotalOfExamByID);
router.put('/:questionID', [mAuth.tokenValidation, mAuth.teacherValidation], udpateExamQuestion);
router.post('/:questionID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationExamQuestion);
router.delete('/:questionID', [mAuth.tokenValidation, mAuth.adminValidation], deleteExamQuestion);

export default router;

/*
import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExam,
    getExams,
    getExamByID,
    getExamsBySubject,
    getExamsByStudent,
    getExamsByStudentAndSubject,
    updateExam,
    changeActivationExam,
    deleteExam
} from '../controllers/exam.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExam);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getExams);

// Routes with params
router.get('/:examID', mAuth.tokenValidation, getExamByID);
router.get('/subject/:subjectID', mAuth.tokenValidation, getExamsBySubject);
router.get('/student/:studentID', mAuth.tokenValidation, getExamsByStudent);
router.get('/student/:studentID/subject/:subjectID', mAuth.tokenValidation, getExamsByStudentAndSubject);
router.put('/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], updateExam);
router.post('/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationExam);
router.delete('/:examID', [mAuth.tokenValidation, mAuth.adminValidation], deleteExam);

export default router;
*/