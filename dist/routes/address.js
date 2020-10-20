"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _address = require("../controllers/address.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Import methods from controller

// Routes without params
router.post('/', _authentication["default"].tokenValidation, _address.createAddress);
router.get('/', _authentication["default"].tokenValidation, _address.getAddresses); // Routes with params

router.put('/:addressID', _authentication["default"].tokenValidation, _address.updateAddress);
router.get('/:addressID', _authentication["default"].tokenValidation, _address.getAddress);
router.post('/:addressID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _address.changeActivationAddress);
router["delete"]('/:addressID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _address.deleteAddress);
router.get('/person/:personID', [_authentication["default"].tokenValidation], _address.getAddressPerson);
var _default = router;
exports["default"] = _default;