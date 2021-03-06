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
    getStudentByCollege,
    assignStudentToCourse,
    getStudentsByTeacher
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
router.put('/assign/course/:courseID', [mAuth.tokenValidation, mAuth.adminValidation], assignStudentToCourse);
router.get('/teacher/:teacherID', [mAuth.tokenValidation, mAuth.teacherValidation], getStudentsByTeacher);

export default router;