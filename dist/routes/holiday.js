"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _holiday = require("../controllers/holiday.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controller imports
var router = (0, _express.Router)(); // Routes without params

router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _holiday.createHoliday);
router.get('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _holiday.getHolidays);
router.get('/search', _authentication["default"].tokenValidation, _holiday.searchHolidayByNameOrDetail);
router.get('/search/location', _authentication["default"].tokenValidation, _holiday.searchHolidayByLocation);
router.get('/search/date', _authentication["default"].tokenValidation, _holiday.searchHolidayByDate); // Routes with params

router.get('/:holidayID', _authentication["default"].tokenValidation, _holiday.getHoliday);
router.get('/country/:countryID', _authentication["default"].tokenValidation, _holiday.getNationalHolidays);
router.put('/:holidayID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _holiday.updateHoliday);
router.post('/:holidayID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _holiday.changeActivationHoliday);
router["delete"]('/:holidayID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _holiday.deleteHoliday);
var _default = router;
exports["default"] = _default;