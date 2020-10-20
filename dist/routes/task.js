"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _task = require("../controllers/task.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _task.createTask);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _task.getTasks); // Routes with params

router.put('/:taskID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _task.updateTask);
router.post('/:taskID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _task.changeActivationTask);
router.get('/:taskID', _authentication["default"].tokenValidation, _task.getTask);
router["delete"]('/:taskID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _task.deleteTask);
router.get('/subject/:subjectID', _authentication["default"].tokenValidation, _task.getSubjectTasks);
router.get('/student/:studentID', _authentication["default"].tokenValidation, _task.getTaskByStudent);
router.get('/subject/:subjectID/student/:studentID', _authentication["default"].tokenValidation, _task.getTaskByStudentSubject);
var _default = router;
exports["default"] = _default;