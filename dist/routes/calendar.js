"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _calendar = require("../controllers/calendar.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // Routes without params

router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _calendar.generateCalendar); // Routes with params

var _default = router;
exports["default"] = _default;