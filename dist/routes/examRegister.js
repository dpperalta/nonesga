"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _examRegister = require("../controllers/examRegister.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examRegister.createExamRegister);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examRegister.getExamRegisters); // Routes with params

router.get('/:registerID', _authentication["default"].tokenValidation, _examRegister.getExamRegisterByID);
router.get('/student/:studentID', _authentication["default"].tokenValidation, _examRegister.getExamRegistersByStudent);
router.get('/student/active/:studentID', _authentication["default"].tokenValidation, _examRegister.getExamRegistersByStudentActiveExam);
router.get('/exam/all/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examRegister.getExamRegistersByAllExams);
router.get('/exam/active/:examID', [_authentication["default"].tokenValidation], _examRegister.getExamRegistersByActiveExams);
router.get('/subject/:subjectID', _authentication["default"].tokenValidation, _examRegister.getExamRegisterBySubject);
router.put('/:registerID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examRegister.updateExamRegister);
router.put('/review/:registerID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examRegister.reviewExamRegister);
router.put('/register/:registerID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examRegister.registerExamRegister);
router["delete"]('/:registerID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examRegister.deleteExamRegister);
var _default = router;
exports["default"] = _default;