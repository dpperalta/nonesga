import { Router } from 'express';

import mAuth from '../middlewares/authentication';

// Imports from controllers
import {
    createStudent,
    getStudents,
    updateStudent,
    changeActivationStudent,
    getStuddent,
    deleteStudent,
    getStudentByCollege
} from '../controllers/student.controller';

const router = Router();

// Routes without params
router.post('/', mAuth.tokenValidation, createStudent);
router.get('/', [mAuth.tokenValidation, mAuth.superAdminValidation], getStudents);

// Routes with params
router.put('/:studentID', [mAuth.tokenValidation, mAuth.adminValidation], updateStudent);
router.post('/:studentID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationStudent);
router.get('/:studentID', mAuth.tokenValidation, getStuddent);
router.delete('/:studentID', mAuth.tokenValidation, deleteStudent);
router.get('/college/:collegeID', [mAuth.tokenValidation, mAuth.adminValidation], getStudentByCollege);

export default router;

/*
import { Router } from 'express';

import mAuth from '../middlewares/authentication';

// Imports of controllers
import {
    createTeacher,
    getTeachers,
    updateTeacher,
    changeActivationTeacher,
    getTeacher,
    deleteTeacher,
    getTeacherByCollege
} from '../controllers/teacher.controller';

const router = Router();

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createTeacher);
router.get('/', mAuth.tokenValidation, getTeachers);

// Routes with params
router.put('/:teacherID', [mAuth.tokenValidation, mAuth.adminValidation], updateTeacher);
router.post('/:teacherID', [mAuth.tokenValidation, mAuth.adminValidation], changeActivationTeacher);
router.get('/:teacherID', mAuth.tokenValidation, getTeacher);
router.delete('/:teacherID', [mAuth.tokenValidation, mAuth.superAdminValidation], deleteTeacher);
router.get('/college/:collegeID', mAuth.tokenValidation, getTeacherByCollege);

export default router;
*/