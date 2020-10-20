"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _teacher = require("../controllers/teacher.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Imports of controllers
var router = (0, _express.Router)(); // Routes without params

router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _teacher.createTeacher);
router.get('/', _authentication["default"].tokenValidation, _teacher.getTeachers); // Routes with params

router.put('/:teacherID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _teacher.updateTeacher);
router.post('/:teacherID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _teacher.changeActivationTeacher);
router.get('/:teacherID', _authentication["default"].tokenValidation, _teacher.getTeacher);
router["delete"]('/:teacherID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _teacher.deleteTeacher);
router.get('/college/:collegeID', _authentication["default"].tokenValidation, _teacher.getTeacherByCollege);
var _default = router;
exports["default"] = _default;