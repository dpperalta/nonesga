"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _exam = require("../controllers/exam.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _exam.createExam);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _exam.getExams); // Routes with params

router.get('/:examID', _authentication["default"].tokenValidation, _exam.getExamByID);
router.get('/subject/:subjectID', _authentication["default"].tokenValidation, _exam.getExamsBySubject);
router.get('/student/:studentID', _authentication["default"].tokenValidation, _exam.getExamsByStudent);
router.get('/student/:studentID/subject/:subjectID', _authentication["default"].tokenValidation, _exam.getExamsByStudentAndSubject);
router.put('/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _exam.updateExam);
router.post('/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _exam.changeActivationExam);
router["delete"]('/:examID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _exam.deleteExam);
var _default = router;
exports["default"] = _default;