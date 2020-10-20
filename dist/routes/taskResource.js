"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _taskResource = require("../controllers/taskResource.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskResource.createTaskResource);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskResource.getTaskResources); // Routes with params

router.get('/:taskResourceID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskResource.getTaskResource);
router.get('/task/:taskID', _authentication["default"].tokenValidation, _taskResource.getTaskResourcesByTask);
router.put('/:taskResourceID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskResource.updateTaskResource);
router.post('/:taskResourceID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskResource.changeActivationTaskResource);
router["delete"]('/:taskResourceID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskResource.deleteTaskResource);
var _default = router;
exports["default"] = _default;