"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _student = require("../controllers/student.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Imports from controllers
var router = (0, _express.Router)(); // Routes without params

router.post('/', _authentication["default"].tokenValidation, _student.createStudent);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _student.getStudents); // Routes with params

router.put('/:studentID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _student.updateStudent);
router.post('/:studentID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _student.changeActivationStudent);
router.get('/:studentID', _authentication["default"].tokenValidation, _student.getStuddent);
router["delete"]('/:studentID', _authentication["default"].tokenValidation, _student.deleteStudent);
router.get('/college/:collegeID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _student.getStudentByCollege);
var _default = router;
exports["default"] = _default;