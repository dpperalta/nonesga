import { Router } from 'express';
import mAuth from '../middlewares/authentication';

import {
    createForum,
    getForums,
    getForumByID,
    updateForum,
    changeActivationForum,
    deleteForum
} from '../controllers/forum.controller';

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createForum);
router.get('/', mAuth.tokenValidation, getForums);

// Routes with params
router.get('/:forumID', mAuth.tokenValidation, getForumByID);
router.put('/:forumID', [mAuth.tokenValidation, mAuth.teacherValidation], updateForum);
router.post('/:forumID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationForum);
router.delete('/:forumID', [mAuth.tokenValidation, mAuth.adminValidation], deleteForum);

export default router;