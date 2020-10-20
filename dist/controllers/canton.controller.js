"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanton = createCanton;
exports.getCantons = getCantons;
exports.getCanton = getCanton;
exports.getCantonsProvince = getCantonsProvince;
exports.updateCanton = updateCanton;
exports.changeActivationCanton = changeActivationCanton;
exports.deleteCanton = deleteCanton;

var _Canton = _interopRequireDefault(require("../models/Canton"));

var _Province = _interopRequireDefault(require("../models/Province"));

var _Country = _interopRequireDefault(require("../models/Country"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Canton
function createCanton(_x, _x2) {
  return _createCanton.apply(this, arguments);
} // Get information about Cantons


function _createCanton() {
  _createCanton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, cantonCode, cantonName, details, capital, provinceID, newCanton;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, cantonCode = _req$body.cantonCode, cantonName = _req$body.cantonName, details = _req$body.details, capital = _req$body.capital, provinceID = _req$body.provinceID;
            _context.prev = 1;
            _context.next = 4;
            return _Canton["default"].create({
              cantonCode: cantonCode,
              cantonName: cantonName,
              capital: capital,
              details: details,
              provinceID: provinceID
            }, {
              fields: ['cantonCode', 'cantonName', 'details', 'capital', 'provinceID'],
              returning: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'unregisteredDate', 'provinceID']
            });

          case 4:
            newCanton = _context.sent;

            if (!newCanton) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Canton created successfully',
              canton: newCanton
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Canton');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createCanton.apply(this, arguments);
}

function getCantons(_x3, _x4) {
  return _getCantons.apply(this, arguments);
} // Get information of a Canton


function _getCantons() {
  _getCantons = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, cantons;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Canton["default"].findAndCountAll({
              attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'provinceID'],
              where: {
                isActive: true
              },
              include: [{
                model: _Province["default"],
                attributes: ['provinceID', 'provinceCode', 'provinceName'],
                include: [{
                  model: _Country["default"],
                  attributes: ['countryID', 'countryCode', 'countryName']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 5:
            cantons = _context2.sent;

            if (!(cantons.count > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              cantons: cantons
            }));

          case 8:
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Cantons');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));
  return _getCantons.apply(this, arguments);
}

function getCanton(_x5, _x6) {
  return _getCanton.apply(this, arguments);
} // Get all city of a province


function _getCanton() {
  _getCanton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var cantonID, canton;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cantonID = req.params.cantonID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Canton["default"].findOne({
              attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'unregisteredDate', 'provinceID'],
              where: {
                cantonID: cantonID
              },
              include: [{
                model: _Province["default"],
                attributes: ['provinceCode', 'provinceName'],
                include: [{
                  model: _Country["default"],
                  attributes: ['countryCode', 'countryName']
                }]
              }]
            });

          case 4:
            canton = _context3.sent;

            if (!canton) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              canton: canton
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Canton ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Canton by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getCanton.apply(this, arguments);
}

function getCantonsProvince(_x7, _x8) {
  return _getCantonsProvince.apply(this, arguments);
} // Update a Canton


function _getCantonsProvince() {
  _getCantonsProvince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var provinceID, limit, from, cantons;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            provinceID = req.params.provinceID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _Canton["default"].findAndCountAll({
              attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital'],
              where: {
                isActive: true,
                provinceID: provinceID
              },
              include: [{
                model: _Province["default"],
                attributes: ['provinceID', 'provinceName'],
                include: [{
                  model: _Country["default"],
                  attributes: ['countryID', 'countryName']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 6:
            cantons = _context4.sent;

            if (!cantons) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              cantons: cantons
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Province ID');

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Cantons of Province');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getCantonsProvince.apply(this, arguments);
}

function updateCanton(_x9, _x10) {
  return _updateCanton.apply(this, arguments);
} // Change to active or inactive a Canton


function _updateCanton() {
  _updateCanton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var cantonID, _req$body2, cantonCode, cantonName, details, capital, provinceID, dbCanton, _updateCanton2;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cantonID = req.params.cantonID;
            _req$body2 = req.body, cantonCode = _req$body2.cantonCode, cantonName = _req$body2.cantonName, details = _req$body2.details, capital = _req$body2.capital, provinceID = _req$body2.provinceID;
            _context5.prev = 2;
            _context5.next = 5;
            return _Canton["default"].findOne({
              attributes: ['cantonID', 'cantonCode', 'cantonName', 'details', 'capital', 'isActive', 'registeredDate', 'unregisteredDate', 'provinceID'],
              where: {
                cantonID: cantonID
              }
            });

          case 5:
            dbCanton = _context5.sent;

            if (!(dbCanton === null || dbCanton === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Canton ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _Canton["default"].update({
              cantonCode: cantonCode,
              cantonName: cantonName,
              details: details,
              capital: capital,
              provinceID: provinceID
            }, {
              where: {
                cantonID: cantonID
              }
            });

          case 12:
            _updateCanton2 = _context5.sent;

            if (!_updateCanton2) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Canton updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Canton ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Canton');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateCanton.apply(this, arguments);
}

function changeActivationCanton(_x11, _x12) {
  return _changeActivationCanton.apply(this, arguments);
} // Delete a Canton


function _changeActivationCanton() {
  _changeActivationCanton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var cantonID, type, value, action, afirmation, negation, changeActivationJSON, dbCanton, changeActivation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            cantonID = req.params.cantonID;
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
                isActive: true,
                unregisteredDate: null
              };
            } else {
              if (type.toLowerCase() === 'inactivate') {
                value = false;
                action = 'Inactivating';
                afirmation = 'inactive';
                negation = 'active';
                changeActivationJSON = {
                  isActive: false,
                  unregisteredDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
                };
              } else {
                (0, _errors.returnWrongError)(res, 'type', 'request');
              }
            }

            _context6.prev = 6;
            _context6.next = 9;
            return _Canton["default"].findOne({
              attributes: ['cantonID', 'cantonCode', 'cantonName', 'isActive', 'registeredDate'],
              where: {
                cantonID: cantonID
              }
            });

          case 9:
            dbCanton = _context6.sent;

            if (!dbCanton) {
              _context6.next = 21;
              break;
            }

            _context6.next = 13;
            return _Canton["default"].update(changeActivationJSON, {
              where: {
                cantonID: cantonID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context6.sent;

            if (!(changeActivation > 0)) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Canton ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Canton or Canton already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context6.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Canton ID');

          case 22:
            _context6.next = 28;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](6);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Change Activation Canton');

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 24]]);
  }));
  return _changeActivationCanton.apply(this, arguments);
}

function deleteCanton(_x13, _x14) {
  return _deleteCanton.apply(this, arguments);
}

function _deleteCanton() {
  _deleteCanton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var cantonID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            cantonID = req.params.cantonID;
            _context7.prev = 1;
            _context7.next = 4;
            return _Canton["default"].destroy({
              where: {
                cantonID: cantonID
              }
            });

          case 4:
            countDeleted = _context7.sent;

            if (!(countDeleted > 0)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Canton deleted successfuylly'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Canton ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Delete Canton');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deleteCanton.apply(this, arguments);
}