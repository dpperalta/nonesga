import { Router } from 'express';
import mAuth from '../middlewares/authentication';

import {
    createForumContent,
    getForumContents
} from '../controllers/forumContent.controller';

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createForumContent);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getForumContents);

// Routes with params

export default router;

/*
import { Router } from 'express';
import mAuth from '../middlewares/authentication';

import {
    createForum,
    getForums,
    getForumByID,
    updateForum,
    changeActivationForum,
    deleteForum,
    getForumByTeacher,
    getForumsByStudent,
    getForumsBySubject
} from '../controllers/forum.controller';

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createForum);
router.get('/', mAuth.tokenValidation, getForums);

// Routes with params
router.get('/:forumID', mAuth.tokenValidation, getForumByID);
router.get('/teacher/:teacherID', [mAuth.tokenValidation, mAuth.teacherValidation], getForumByTeacher);
router.get('/student/:studentID', [mAuth.tokenValidation, mAuth.teacherValidation], getForumsByStudent);
router.get('/subject/:subjectID', [mAuth.tokenValidation, mAuth.teacherValidation], getForumsBySubject);
router.put('/:forumID', [mAuth.tokenValidation, mAuth.teacherValidation], updateForum);
router.post('/:forumID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationForum);
router.delete('/:forumID', [mAuth.tokenValidation, mAuth.adminValidation], deleteForum);

export default router;
*/