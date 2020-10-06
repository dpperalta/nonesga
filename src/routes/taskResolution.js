import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

// imports
import {
    createTaskResolution,
    getTaskResolutions,
    getTaskResolutionByID,
    getTaskResolutionByTask,
    updateTaskResolution,
    changeActivationTaskResolution,
    deleteTaskResolution
} from '../controllers/taskResolution.controller';

// Routes without params
router.post('/', mAuth.tokenValidation, createTaskResolution);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getTaskResolutions);

// Routes with params
router.get('/:resolutionID', mAuth.tokenValidation, getTaskResolutionByID);
router.get('/task/:taskID', [mAuth.tokenValidation, mAuth.teacherValidation], getTaskResolutionByTask);
router.put('/:resolutionID', mAuth.tokenValidation, updateTaskResolution);
router.post('/:resolutionID', mAuth.tokenValidation, changeActivationTaskResolution);
router.delete('/:resolutionID', [mAuth.tokenValidation, mAuth.adminValidation], deleteTaskResolution);

export default router;