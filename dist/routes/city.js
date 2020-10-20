"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _city = require("../controllers/city.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _city.createCity);
router.get('/', _authentication["default"].tokenValidation, _city.getCities); // Routes with params

router.get('/:cityID', _authentication["default"].tokenValidation, _city.getCity);
router.put('/:cityID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _city.updateCity);
router.post('/:cityID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _city.changeActivationCity);
router["delete"]('/:cityID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _city.deleteCity);
router.get('/canton/:cantonID', _authentication["default"].tokenValidation, _city.getCitiesCanton);
var _default = router;
exports["default"] = _default;