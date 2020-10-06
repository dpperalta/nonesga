import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router()

import {
    createTaskResource,
    getTaskResources,
    getTaskResource,
    getTaskResourcesByTask,
    updateTaskResource,
    changeActivationTaskResource,
    deleteTaskResource
} from '../controllers/taskResource.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createTaskResource);
router.get('/', [mAuth.tokenValidation, mAuth.teacherValidation], getTaskResources);

// Routes with params
router.get('/:taskResourceID', [mAuth.tokenValidation, mAuth.teacherValidation], getTaskResource);
router.get('/task/:taskID', mAuth.tokenValidation, getTaskResourcesByTask);
router.put('/:taskResourceID', [mAuth.tokenValidation, mAuth.teacherValidation], updateTaskResource);
router.post('/:taskResourceID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationTaskResource);
router.delete('/:taskResourceID', [mAuth.tokenValidation, mAuth.adminValidation], deleteTaskResource);

export default router;