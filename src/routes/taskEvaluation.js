import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createTaskEvaluation,
    getTaskEvaluations,
    getTaskEvaluationByID,
    getTaskEvaluationsByTask,
    updateTaskEvaluation,
    updateTaskEvaluationStudent,
    changeActivationTaskEvaluation,
    deleteTaskEvaluation
} from '../controllers/taskEvaluation.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createTaskEvaluation);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getTaskEvaluations);

// Routers with params
router.get('/:taskEvaluationID', mAuth.tokenValidation, getTaskEvaluationByID);
router.get('/task/:taskID', mAuth.tokenValidation, getTaskEvaluationsByTask);
router.put('/:taskEvaluationID', [mAuth.tokenValidation, mAuth.teacherValidation], updateTaskEvaluation);
router.put('/student/:taskEvaluationID', mAuth.tokenValidation, updateTaskEvaluationStudent);
router.post('/:taskEvaluationID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationTaskEvaluation);
router.delete('/:taskEvaluationID', [mAuth.tokenValidation, mAuth.adminValidation], deleteTaskEvaluation);

export default router;