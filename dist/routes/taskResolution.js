"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _taskResolution = require("../controllers/taskResolution.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // imports

// Routes without params
router.post('/', _authentication["default"].tokenValidation, _taskResolution.createTaskResolution);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskResolution.getTaskResolutions); // Routes with params

router.get('/:resolutionID', _authentication["default"].tokenValidation, _taskResolution.getTaskResolutionByID);
router.get('/task/:taskID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _taskResolution.getTaskResolutionByTask);
router.put('/:resolutionID', _authentication["default"].tokenValidation, _taskResolution.updateTaskResolution);
router.post('/:resolutionID', _authentication["default"].tokenValidation, _taskResolution.changeActivationTaskResolution);
router["delete"]('/:resolutionID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskResolution.deleteTaskResolution);
var _default = router;
exports["default"] = _default;