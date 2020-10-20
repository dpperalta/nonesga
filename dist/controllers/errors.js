"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnError = returnError;
exports.returnNotFound = returnNotFound;
exports.returnWrongError = returnWrongError;

var _ErrorLog = _interopRequireDefault(require("../models/ErrorLog"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function returnError(res, e, module) {
  var error = e.original.hint || e.original.detail || 'Unknown error - maybe datatype';

  _ErrorLog["default"].create({
    errorDate: _database.sequelize.fn('NOW'),
    errorDetail: e,
    errorModule: module
  }, {
    fields: ['errorDate', 'errorDetail', 'errorModule'],
    returning: ['errorLogID', 'errorDate', 'errorDetail', 'errorModule']
  });

  return res.status(500).json({
    ok: false,
    message: 'Database Error, see details for information',
    error: error
  });
}

function returnNotFound(res, value) {
  value = 'Could not find any ' + value + ' with this searching parameter(s)';
  return res.status(404).json({
    ok: false,
    message: value
  });
}

function returnWrongError(res, argument, value) {
  var error = 'Wrong ' + argument + ' for the ' + value + ' please validate';
  return res.status(400).json({
    ok: false,
    message: error
  });
}