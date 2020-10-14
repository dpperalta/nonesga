import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createStudentAnswer,
    getStudentAnswers,
    getStudentAnswerByID,
    getStudentAnswersByStudent,
    getStudentAnswersByExam,
    getStudentAnswersByExamAndStudent,
    updateStudentAnswerByTeacher,
    updateStudentAnswerByStudent,
    updateDetails,
    deleteStudentAnswer,
    publishStudenAnswer
} from '../controllers/studentAnswer.controller';

// Routes without params
router.post('/', mAuth.tokenValidation, createStudentAnswer);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getStudentAnswers);
router.put('/', mAuth.tokenValidation, publishStudenAnswer);

// Routes with params
router.get('/:studentAnswerID', mAuth.tokenValidation, getStudentAnswerByID);
router.get('/student/:studentID', mAuth.tokenValidation, getStudentAnswersByStudent);
router.get('/exam/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], getStudentAnswersByExam);
router.get('/exam/:examID/student/:studentID', mAuth.tokenValidation, getStudentAnswersByExamAndStudent);
router.put('/teacher/:studentAnswerID', [mAuth.tokenValidation, mAuth.teacherValidation], updateStudentAnswerByTeacher);
router.put('/student/:studentAnswerID', mAuth.tokenValidation, updateStudentAnswerByStudent);
router.put('/details/:studentAnswerID', mAuth.tokenValidation, updateDetails);
router.delete('/:studentAnswerID', [mAuth.tokenValidation, mAuth.adminValidation], deleteStudentAnswer);

export default router;