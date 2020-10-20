"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _enrollment = require("../controllers/enrollment.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', _authentication["default"].tokenValidation, _enrollment.createEnrollment);
router.get('/', _authentication["default"].tokenValidation, _enrollment.getEnrollments); // Routes with params

router.get('/:enrollmentID', _authentication["default"].tokenValidation, _enrollment.getEnrollment);
router.get('/parameter/:valueID', _authentication["default"].tokenValidation, _enrollment.getEnrollmentByParameter);
router.get('/college/:collegeID', _authentication["default"].tokenValidation, _enrollment.getEnrollmentByCollege);
router.get('/dni/:dni', _authentication["default"].tokenValidation, _enrollment.getEnrollmentByDNI);
router.put('/:enrollmentID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _enrollment.updateEnrollment);
router.put('/process/:enrollmentID', _authentication["default"].tokenValidation, _enrollment.updateProcessEnrollment);
router["delete"]('/:enrollmentID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _enrollment.deleteEnrollment);
var _default = router;
exports["default"] = _default;