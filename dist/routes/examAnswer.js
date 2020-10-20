"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _examAnswer = require("../controllers/examAnswer.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examAnswer.createExamAnswer);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examAnswer.getExamAnswers); // Routes with params

router.get('/:answerID', [_authentication["default"].tokenValidation], _examAnswer.getExamAnswerByID);
router.get('/question/:questionID', [_authentication["default"].tokenValidation], _examAnswer.getExamAnswerByQuestion);
router.get('/exam/:examID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examAnswer.getExamAnswerByExam);
router.put('/:answerID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examAnswer.updateAnswer);
router.post('/:answerID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _examAnswer.changeActivationExamAnswer);
router["delete"]('/:answerID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _examAnswer.deleteExamAnswer);
var _default = router;
exports["default"] = _default;