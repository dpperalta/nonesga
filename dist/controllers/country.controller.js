"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCountry = createCountry;
exports.getCountries = getCountries;
exports.changeActivationCountry = changeActivationCountry;
exports.updateCountry = updateCountry;
exports.getCountry = getCountry;
exports.deleteCountry = deleteCountry;

var _Country = _interopRequireDefault(require("../models/Country"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Country
function createCountry(_x, _x2) {
  return _createCountry.apply(this, arguments);
} // Get all active countries


function _createCountry() {
  _createCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, countryCode, countryName, countryDetails, callCode, currency, currencySymbol, shortLanguage, longLanguage, status, newCountry;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, countryCode = _req$body.countryCode, countryName = _req$body.countryName, countryDetails = _req$body.countryDetails, callCode = _req$body.callCode, currency = _req$body.currency, currencySymbol = _req$body.currencySymbol, shortLanguage = _req$body.shortLanguage, longLanguage = _req$body.longLanguage;
            status = 1;
            _context.prev = 2;
            _context.next = 5;
            return _Country["default"].create({
              countryCode: countryCode,
              countryName: countryName,
              countryDetails: countryDetails,
              callCode: callCode,
              currency: currency,
              currencySymbol: currencySymbol,
              longLanguage: longLanguage,
              shortLanguage: shortLanguage,
              status: status
            }, {
              fields: ['countryCode', 'countryName', 'countryDetails', 'callCode', 'currency', 'currencySymbol', 'longLanguage', 'shortLanguage', 'status'],
              returning: ['countryID', 'countryCode', 'countryName', 'countryDetails', 'callCode', 'isActive', 'registeredDate', 'unregisteredDate', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status']
            });

          case 5:
            newCountry = _context.sent;

            if (!newCountry) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Country created successfully',
              country: newCountry
            }));

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Country');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _createCountry.apply(this, arguments);
}

function getCountries(_x3, _x4) {
  return _getCountries.apply(this, arguments);
} // Change to active or inactive to a country


function _getCountries() {
  _getCountries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, countries;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Country["default"].findAndCountAll({
              attributes: ['countryID', 'countryCode', 'countryName', 'countryDetails', 'isActive', 'registeredDate', 'unregisteredDate', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status'],
              order: [['countryName', 'ASC']],
              where: {
                isActive: true
              },
              limit: limit,
              offset: from
            });

          case 5:
            countries = _context2.sent;

            if (!countries) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              countries: countries
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Country');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              e: _context2.t0
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getCountries.apply(this, arguments);
}

function changeActivationCountry(_x5, _x6) {
  return _changeActivationCountry.apply(this, arguments);
} // Update a country


function _changeActivationCountry() {
  _changeActivationCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var countryID, type, value, action, afirmation, negation, changeActivationJSON, dbCountry, changeActivation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            countryID = req.params.countryID;
            type = req.query.type;
            action = '';
            afirmation = '';
            negation = '';

            if (type.toLowerCase() === 'activate') {
              value = true;
              action = 'Activating';
              afirmation = 'active';
              negation = 'inactive';
              changeActivationJSON = {
                isActive: value,
                unregisteredDate: null
              };
            } else {
              if (type.toLowerCase() === 'inactivate') {
                value = false;
                action = 'Inactivating';
                afirmation = 'inactive';
                negation = 'active';
                changeActivationJSON = {
                  isActive: value,
                  unregisteredDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
                };
              } else {
                (0, _errors.returnWrongError)(res, 'type', 'request');
              }
            }

            _context3.prev = 6;
            _context3.next = 9;
            return _Country["default"].findOne({
              attributes: ['countryID', 'countryCode', 'countryName', 'isActive', 'registeredDate', 'unregisteredDate', 'shortLanguage'],
              where: {
                countryID: countryID
              }
            });

          case 9:
            dbCountry = _context3.sent;

            if (!dbCountry) {
              _context3.next = 21;
              break;
            }

            _context3.next = 13;
            return _Country["default"].update(changeActivationJSON, {
              where: {
                countryID: countryID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context3.sent;

            if (!(changeActivation > 0)) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Country ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context3.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error while ' + action + ' a Country or Country already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context3.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Country ID');

          case 22:
            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](6);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Change Activation Country');

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 24]]);
  }));
  return _changeActivationCountry.apply(this, arguments);
}

function updateCountry(_x7, _x8) {
  return _updateCountry.apply(this, arguments);
} // Get information of a country by ID


function _updateCountry() {
  _updateCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var countryID, _req$body2, countryCode, countryName, countryDetails, callCode, currency, currencySymbol, shortLanguage, longLanguage, status, dbCountry, _updateCountry2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            countryID = req.params.countryID;
            _req$body2 = req.body, countryCode = _req$body2.countryCode, countryName = _req$body2.countryName, countryDetails = _req$body2.countryDetails, callCode = _req$body2.callCode, currency = _req$body2.currency, currencySymbol = _req$body2.currencySymbol, shortLanguage = _req$body2.shortLanguage, longLanguage = _req$body2.longLanguage, status = _req$body2.status;
            _context4.prev = 2;
            _context4.next = 5;
            return _Country["default"].findOne({
              attributes: ['countryID', 'countryName', 'countryCode', 'countryDetails', 'callCode', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status'],
              where: {
                countryID: countryID
              }
            });

          case 5:
            dbCountry = _context4.sent;

            if (!(dbCountry === null || dbCountry === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Country ID');
            _context4.next = 18;
            break;

          case 10:
            _context4.next = 12;
            return _Country["default"].update({
              countryCode: countryCode,
              countryName: countryName,
              countryDetails: countryDetails,
              callCode: callCode,
              currency: currency,
              currencySymbol: currencySymbol,
              shortLanguage: shortLanguage,
              longLanguage: longLanguage,
              status: status
            }, {
              where: {
                countryID: countryID
              }
            });

          case 12:
            _updateCountry2 = _context4.sent;

            if (!_updateCountry2) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Country updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Country ID');

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update Country');

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 20]]);
  }));
  return _updateCountry.apply(this, arguments);
}

function getCountry(_x9, _x10) {
  return _getCountry.apply(this, arguments);
} // Delete a country


function _getCountry() {
  _getCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var countryID, country;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            countryID = req.params.countryID;
            _context5.prev = 1;
            _context5.next = 4;
            return _Country["default"].findOne({
              attributes: ['countryID', 'countryCode', 'countryName', 'countryDetails', 'isActive', 'registeredDate', 'unregisteredDate', 'currency', 'currencySymbol', 'shortLanguage', 'longLanguage', 'status'],
              where: {
                countryID: countryID
              }
            });

          case 4:
            country = _context5.sent;

            if (!country) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              country: country
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Country ID');

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);
            return _context5.abrupt("return", res.status(500).json({
              e: _context5.t0
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _getCountry.apply(this, arguments);
}

function deleteCountry(_x11, _x12) {
  return _deleteCountry.apply(this, arguments);
}

function _deleteCountry() {
  _deleteCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var countryID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            countryID = req.params.countryID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Country["default"].destroy({
              where: {
                countryID: countryID
              }
            });

          case 4:
            countDeleted = _context6.sent;

            if (!(countDeleted > 0)) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Country deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Country ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Country');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteCountry.apply(this, arguments);
}