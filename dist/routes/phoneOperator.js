"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _phoneOperator = require("../controllers/phoneOperator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _phoneOperator.createPhoneOperator);
router.get('/', _authentication["default"].tokenValidation, _phoneOperator.getPhoneOperators); // Routes with params

router.get('/:operatorID', _authentication["default"].tokenValidation, _phoneOperator.getPhoneOperator);
router.post('/:operatorID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _phoneOperator.changeActivationPhoneOperator);
router.put('/:operatorID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _phoneOperator.updatePhoneOperator);
router["delete"]('/:operatorID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _phoneOperator.deletePhoneOperator);
var _default = router;
exports["default"] = _default;