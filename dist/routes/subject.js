"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _subject = require("../controllers/subject.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Import of functions

// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _subject.createSubject);
router.get('/', [_authentication["default"].tokenValidation], _subject.getSubjects); // Routes with paramas

router.get('/:subjectID', _authentication["default"].tokenValidation, _subject.getSubject);
router.put('/:subjectID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _subject.updateSubject);
router.post('/:subjectID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _subject.changeActivationSubject);
router["delete"]('/:subjectID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _subject.deleteSubject);
var _default = router;
exports["default"] = _default;