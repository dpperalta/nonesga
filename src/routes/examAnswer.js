import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExamAnswer,
    getExamAnswers,
    getExamAnswerByID,
    getExamAnswerByQuestion,
    getExamAnswerByExam,
    updateAnswer,
    changeActivationExamAnswer,
    deleteExamAnswer
} from '../controllers/examAnswer.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExamAnswer);
router.get('/', [mAuth.tokenValidation, mAuth.teacherValidation], getExamAnswers);

// Routes with params
router.get('/:answerID', [mAuth.tokenValidation], getExamAnswerByID);
router.get('/question/:questionID', [mAuth.tokenValidation], getExamAnswerByQuestion);
router.get('/exam/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], getExamAnswerByExam);
router.put('/:answerID', [mAuth.tokenValidation, mAuth.teacherValidation], updateAnswer);
router.post('/:answerID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationExamAnswer);
router.delete('/:answerID', [mAuth.tokenValidation, mAuth.adminValidation], deleteExamAnswer);

export default router;