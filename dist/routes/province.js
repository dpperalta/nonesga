"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _province = require("../controllers/province.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _province.createProvince);
router.get('/', _authentication["default"].tokenValidation, _province.getProvinces); // Routes with params

router.get('/:provinceID', _authentication["default"].tokenValidation, _province.getProvince);
router.put('/:provinceID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _province.updateProvince);
router.post('/:provinceID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _province.changeActivationProvince);
router["delete"]('/:provinceID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _province.deleteProvince);
router.get('/country/:countryID', _authentication["default"].tokenValidation, _province.getProvincesCountry);
var _default = router;
exports["default"] = _default;