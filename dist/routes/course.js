"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _course = require("../controllers/course.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _course.createCourse);
router.get('/', _authentication["default"].tokenValidation, _course.getCourses); // Routes with params

router.get('/:courseID', _authentication["default"].tokenValidation, _course.getCourse);
router.put('/:courseID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _course.updateCourse);
router.post('/:courseID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _course.changeActivationCourse);
router["delete"]('/:courseID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _course.deleteCourse);
var _default = router;
exports["default"] = _default;