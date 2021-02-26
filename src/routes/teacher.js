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
    getTeacherByCollege,
    getTeacherByPerson
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
router.get('/person/:personID', mAuth.tokenValidation, getTeacherByPerson);

export default router;