"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _enrollmentStatus = require("../controllers/enrollmentStatus.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _enrollmentStatus.createEnrollmentStatus);
router.get('/', _authentication["default"].tokenValidation, _enrollmentStatus.getAllEnrollmentStatus); // Routes with params

router.put('/:statusID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _enrollmentStatus.updateEnrollmentStatus);
router.get('/:statusID', _authentication["default"].tokenValidation, _enrollmentStatus.getEnrollmentStatus);
router.post('/:statusID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _enrollmentStatus.changeActivationEnrollmentStatus);
router["delete"]('/:statusID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _enrollmentStatus.deleteEnrollmentStatus);
var _default = router;
exports["default"] = _default;