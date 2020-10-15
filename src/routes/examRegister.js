import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExamRegister,
    getExamRegisterByID,
    getExamRegisters,
    getExamRegistersByStudent,
    getExamRegistersByAllExams,
    getExamRegistersByActiveExams,
    getExamRegisterBySubject,
    getExamRegistersByStudentActiveExam,
    updateExamRegister,
    reviewExamRegister,
    registerExamRegister,
    deleteExamRegister
} from '../controllers/examRegister.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExamRegister);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getExamRegisters);

// Routes with params
router.get('/:registerID', mAuth.tokenValidation, getExamRegisterByID);
router.get('/student/:studentID', mAuth.tokenValidation, getExamRegistersByStudent);
router.get('/student/active/:studentID', mAuth.tokenValidation, getExamRegistersByStudentActiveExam);
router.get('/exam/all/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], getExamRegistersByAllExams);
router.get('/exam/active/:examID', [mAuth.tokenValidation], getExamRegistersByActiveExams);
router.get('/subject/:subjectID', mAuth.tokenValidation, getExamRegisterBySubject);
router.put('/:registerID', [mAuth.tokenValidation, mAuth.teacherValidation], updateExamRegister);
router.put('/review/:registerID', [mAuth.tokenValidation, mAuth.teacherValidation], reviewExamRegister);
router.put('/register/:registerID', [mAuth.tokenValidation, mAuth.teacherValidation], registerExamRegister);
router.delete('/:registerID', [mAuth.tokenValidation, mAuth.adminValidation], deleteExamRegister);

export default router;