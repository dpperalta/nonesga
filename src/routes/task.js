import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createTask,
    getTasks,
    updateTask,
    changeActivationTask,
    getTask,
    deleteTask,
    getSubjectTasks,
    getTaskByStudent,
    getTaskByStudentSubject
} from '../controllers/task.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createTask);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getTasks);

// Routes with params
router.put('/:taskID', [mAuth.tokenValidation, mAuth.teacherValidation], updateTask);
router.post('/:taskID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationTask);
router.get('/:taskID', mAuth.tokenValidation, getTask);
router.delete('/:taskID', [mAuth.tokenValidation, mAuth.adminValidation], deleteTask);
router.get('/subject/:subjectID', mAuth.tokenValidation, getSubjectTasks);
router.get('/student/:studentID', mAuth.tokenValidation, getTaskByStudent);
router.get('/subject/:subjectID/student/:studentID', mAuth.tokenValidation, getTaskByStudentSubject);

export default router;