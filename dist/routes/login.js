"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _login = require("../controllers/login.controller");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const mAuth = require('../middlewares/authentication');
var router = (0, _express.Router)(); // Routes without params

router.post('/', _login.login);
router.get('/renew', [_authentication["default"].tokenValidation], _login.tokenRenew); // Routes with params

router["delete"]('/logout/:userID', _authentication["default"].tokenValidation, _login.logout);
var _default = router;
exports["default"] = _default;