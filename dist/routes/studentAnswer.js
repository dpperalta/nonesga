"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _studentAnswer = require("../controllers/studentAnswer.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', _authentication["default"].tokenValidation, _studentAnswer.createStudentAnswer);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _studentAnswer.getStudentAnswers);
router.put('/', _authentication["default"].tokenValidation, _studentAnswer.publishStudenAnswer); // Routes with params

router.get('/:studentAnswerID', _authentication["default"].tokenValidation, _studentAnswer.getStudentAnswerByID);
router.get('/student/:studentID', _authentication["default"].tokenValidation, _studentAnswer.getStudentAnswersByStudent);
router.get('/exam/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _studentAnswer.getStudentAnswersByExam);
router.get('/exam/:examID/student/:studentID', _authentication["default"].tokenValidation, _studentAnswer.getStudentAnswersByExamAndStudent);
router.put('/teacher/:studentAnswerID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _studentAnswer.updateStudentAnswerByTeacher);
router.put('/student/:studentAnswerID', _authentication["default"].tokenValidation, _studentAnswer.updateStudentAnswerByStudent);
router.put('/details/:studentAnswerID', _authentication["default"].tokenValidation, _studentAnswer.updateDetails);
router["delete"]('/:studentAnswerID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _studentAnswer.deleteStudentAnswer);
var _default = router;
exports["default"] = _default;