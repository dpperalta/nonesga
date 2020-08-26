import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

// Import of functions
import {
    createSubject,
    getSubjects
} from '../controllers/subject.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createSubject);
router.get('/', [mAuth.tokenValidation], getSubjects);

// Routes with paramas

export default router;
/*
import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createCourse,
    getCourse,
    getCourses,
    updateCourse,
    changeActivationCourse,
    deleteCourse
} from '../controllers/course.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCourse);
router.get('/', mAuth.tokenValidation, getCourses);

// Routes with params
router.get('/:courseID', mAuth.tokenValidation, getCourse);
router.put('/:courseID', [mAuth.tokenValidation, mAuth.adminValidation], updateCourse);
router.post('/:courseID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationCourse);
router.delete('/:courseID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteCourse);

export default router;
*/