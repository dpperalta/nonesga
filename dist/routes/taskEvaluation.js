"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _taskEvaluation = require("../controllers/taskEvaluation.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskEvaluation.createTaskEvaluation);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskEvaluation.getTaskEvaluations); // Routers with params

router.get('/:taskEvaluationID', _authentication["default"].tokenValidation, _taskEvaluation.getTaskEvaluationByID);
router.get('/task/:taskID', _authentication["default"].tokenValidation, _taskEvaluation.getTaskEvaluationsByTask);
router.put('/:taskEvaluationID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskEvaluation.updateTaskEvaluation);
router.put('/student/:taskEvaluationID', _authentication["default"].tokenValidation, _taskEvaluation.updateTaskEvaluationStudent);
router.post('/:taskEvaluationID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskEvaluation.changeActivationTaskEvaluation);
router["delete"]('/:taskEvaluationID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskEvaluation.deleteTaskEvaluation);
var _default = router;
exports["default"] = _default;