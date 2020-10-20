"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _country = require("../controllers/country.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Routes without params

router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _country.createCountry);
router.get('/', _authentication["default"].tokenValidation, _country.getCountries); // Routes with params

router.put('/:countryID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _country.updateCountry);
router.post('/:countryID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _country.changeActivationCountry);
router.get('/:countryID', _authentication["default"].tokenValidation, _country.getCountry);
router["delete"]('/:countryID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _country.deleteCountry);
var _default = router;
exports["default"] = _default;