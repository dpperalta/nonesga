"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _content = require("../controllers/content.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Import of functions

// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _content.createContent);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _content.getAllContent); // Routes with paramas

router.get('/subject/:subjectID', _authentication["default"].tokenValidation, _content.getContentBySubject);
router.post('/:contentID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _content.changeActivationContent);
router.put('/:contentID', [_authentication["default"].tokenValidation, _authentication["default"].teacherValidation], _content.updateContent);
router["delete"]('/:contentID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _content.deleteContent);
var _default = router;
exports["default"] = _default;