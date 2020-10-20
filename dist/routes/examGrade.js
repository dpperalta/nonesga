"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _examGrade = require("../controllers/examGrade.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examGrade.createExamGrade);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examGrade.getExamGrades); // Routes with params

router.get('/:examGradeID', [_authentication["default"].tokenValidation], _examGrade.getExamGradeByID);
router.get('/student/:studentID', _authentication["default"].tokenValidation, _examGrade.getExamGradesByStudent);
router.get('/student/:studentID/exam/:examID', _authentication["default"].tokenValidation, _examGrade.getExamGradesByStudentAndExam);
router.get('/teacher/:teacherID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examGrade.getExamGradesByTeacher);
router.get('/teacher/:teacherID/exam/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examGrade.getExamGradesByTeacherAndExam);
router.put('/:examGradeID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examGrade.updateExamGrade);
router["delete"]('/:examGradeID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examGrade.deleteExamGrade);
var _default = router;
exports["default"] = _default;