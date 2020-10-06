import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createTaskResolutionResource,
    getTaskResolutionResources,
    getTaskResolutionResourceByID,
    getTaskResolutionResourceByTaskResolution,
    updateTaskResolutionResource,
    changeActivationTaskResolutionResource,
    deleteTaskResolutionResource
} from '../controllers/taskResolutionResource.controller';

// Routes without params
router.post('/', mAuth.tokenValidation, createTaskResolutionResource);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getTaskResolutionResources);

// Routes with params
router.get('/:resourceID', mAuth.tokenValidation, getTaskResolutionResourceByID);
router.get('/taskResolution/:resolutionID', mAuth.tokenValidation, getTaskResolutionResourceByTaskResolution);
router.put('/:resourceID', mAuth.tokenValidation, updateTaskResolutionResource);
router.post('/:resourceID', mAuth.tokenValidation, changeActivationTaskResolutionResource);
router.delete('/:resourceID', [mAuth.tokenValidation, mAuth.adminValidation], deleteTaskResolutionResource);

export default router;