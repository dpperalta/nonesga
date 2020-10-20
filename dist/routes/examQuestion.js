"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _examQuestion = require("../controllers/examQuestion.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examQuestion.createExamQuestion);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examQuestion.getExamQuestions); // Routes with params

router.get('/:questionID', _authentication["default"].tokenValidation, _examQuestion.getExamQuestionByID);
router.get('/exam/:examID', _authentication["default"].tokenValidation, _examQuestion.getExamQuestionByExam);
router.get('/totals/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examQuestion.getTotalOfExamByID);
router.put('/:questionID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examQuestion.udpateExamQuestion);
router.post('/:questionID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examQuestion.changeActivationExamQuestion);
router["delete"]('/:questionID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examQuestion.deleteExamQuestion);
var _default = router;
/*
import { Router } from 'express';
import mAuth from '../middlewares/authentication';

const router = Router();

import {
    createExam,
    getExams,
    getExamByID,
    getExamsBySubject,
    getExamsByStudent,
    getExamsByStudentAndSubject,
    updateExam,
    changeActivationExam,
    deleteExam
} from '../controllers/exam.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.teacherValidation], createExam);
router.get('/', [mAuth.tokenValidation, mAuth.adminValidation], getExams);

// Routes with params
router.get('/:examID', mAuth.tokenValidation, getExamByID);
router.get('/subject/:subjectID', mAuth.tokenValidation, getExamsBySubject);
router.get('/student/:studentID', mAuth.tokenValidation, getExamsByStudent);
router.get('/student/:studentID/subject/:subjectID', mAuth.tokenValidation, getExamsByStudentAndSubject);
router.put('/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], updateExam);
router.post('/:examID', [mAuth.tokenValidation, mAuth.teacherValidation], changeActivationExam);
router.delete('/:examID', [mAuth.tokenValidation, mAuth.adminValidation], deleteExam);

export default router;
*/

exports["default"] = _default;