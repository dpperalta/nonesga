"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _taskResolutionResource = require("../controllers/taskResolutionResource.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', _authentication["default"].tokenValidation, _taskResolutionResource.createTaskResolutionResource);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskResolutionResource.getTaskResolutionResources); // Routes with params

router.get('/:resourceID', _authentication["default"].tokenValidation, _taskResolutionResource.getTaskResolutionResourceByID);
router.get('/taskResolution/:resolutionID', _authentication["default"].tokenValidation, _taskResolutionResource.getTaskResolutionResourceByTaskResolution);
router.put('/:resourceID', _authentication["default"].tokenValidation, _taskResolutionResource.updateTaskResolutionResource);
router.post('/:resourceID', _authentication["default"].tokenValidation, _taskResolutionResource.changeActivationTaskResolutionResource);
router["delete"]('/:resourceID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _taskResolutionResource.deleteTaskResolutionResource);
var _default = router;
exports["default"] = _default;