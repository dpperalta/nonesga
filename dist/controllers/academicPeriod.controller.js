"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAcademicPeriod = createAcademicPeriod;
exports.getAcademicPeriods = getAcademicPeriods;
exports.getAcademicPeriod = getAcademicPeriod;
exports.changeActivationAcademicPeriod = changeActivationAcademicPeriod;
exports.updateAcademicPeriod = updateAcademicPeriod;
exports.deleteAcademicPeriod = deleteAcademicPeriod;

var _AcademicPeriod = _interopRequireDefault(require("../models/AcademicPeriod"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Academic Period
function createAcademicPeriod(_x, _x2) {
  return _createAcademicPeriod.apply(this, arguments);
} // Get all Academic Periods


function _createAcademicPeriod() {
  _createAcademicPeriod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, startPeriod, endPeriod, periodName, detail, newAcademicPeriod;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, startPeriod = _req$body.startPeriod, endPeriod = _req$body.endPeriod, periodName = _req$body.periodName, detail = _req$body.detail;
            _context.prev = 1;
            _context.next = 4;
            return _AcademicPeriod["default"].create({
              startPeriod: startPeriod,
              endPeriod: endPeriod,
              periodName: periodName,
              detail: detail
            }, {
              fields: ['startPeriod', 'endPeriod', 'periodName', 'detail'],
              returning: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail']
            });

          case 4:
            newAcademicPeriod = _context.sent;

            if (!newAcademicPeriod) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Academic Period created successfully',
              academicPeriod: newAcademicPeriod
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Academic Period');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createAcademicPeriod.apply(this, arguments);
}

function getAcademicPeriods(_x3, _x4) {
  return _getAcademicPeriods.apply(this, arguments);
} // Get information of an Academic Period


function _getAcademicPeriods() {
  _getAcademicPeriods = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, academicPeriods;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.params.limit || 25;
            from = req.params.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _AcademicPeriod["default"].findAndCountAll({
              attributes: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail'],
              limit: limit,
              offset: from
            });

          case 5:
            academicPeriods = _context2.sent;

            if (!(academicPeriods.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              academicPeriods: academicPeriods
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Academic Period');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Academic Periods');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getAcademicPeriods.apply(this, arguments);
}

function getAcademicPeriod(_x5, _x6) {
  return _getAcademicPeriod.apply(this, arguments);
} // Change to active or inactive an Academic Period


function _getAcademicPeriod() {
  _getAcademicPeriod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var periodID, academicPeriod;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            periodID = req.params.periodID;
            _context3.prev = 1;
            _context3.next = 4;
            return _AcademicPeriod["default"].findOne({
              attributes: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail'],
              where: {
                periodID: periodID
              }
            });

          case 4:
            academicPeriod = _context3.sent;

            if (!academicPeriod) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              academicPeriod: academicPeriod
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Period ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error: ', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get an Academic Period');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getAcademicPeriod.apply(this, arguments);
}

function changeActivationAcademicPeriod(_x7, _x8) {
  return _changeActivationAcademicPeriod.apply(this, arguments);
} // Update an Academic Period


function _changeActivationAcademicPeriod() {
  _changeActivationAcademicPeriod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var periodID, type, value, action, afirmation, negation, changeActivationJSON, dbAcademicPeriod, changeActivation;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            periodID = req.params.periodID;
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
                returnWrongError(res, 'type', 'request');
              }
            }

            _context4.prev = 6;
            _context4.next = 9;
            return _AcademicPeriod["default"].findOne({
              attributes: ['periodID', 'periodName', 'isActive', 'unregisteredDate', 'registeredDate'],
              where: {
                periodID: periodID
              }
            });

          case 9:
            dbAcademicPeriod = _context4.sent;

            if (!dbAcademicPeriod) {
              _context4.next = 21;
              break;
            }

            _context4.next = 13;
            return _AcademicPeriod["default"].update(changeActivationJSON, {
              where: {
                periodID: periodID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context4.sent;

            if (!(changeActivation > 0)) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Academic Period ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Academic Period or Academic Period already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context4.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](6);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Change Activation Academic Period');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 24]]);
  }));
  return _changeActivationAcademicPeriod.apply(this, arguments);
}

function updateAcademicPeriod(_x9, _x10) {
  return _updateAcademicPeriod.apply(this, arguments);
} // Delete an Academic Period


function _updateAcademicPeriod() {
  _updateAcademicPeriod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var periodID, _req$body2, startPeriod, endPeriod, periodName, detail, dbAcademicPeriod, _updateAcademicPeriod2;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            periodID = req.params.periodID;
            _req$body2 = req.body, startPeriod = _req$body2.startPeriod, endPeriod = _req$body2.endPeriod, periodName = _req$body2.periodName, detail = _req$body2.detail;
            _context5.prev = 2;
            _context5.next = 5;
            return _AcademicPeriod["default"].findOne({
              attributes: ['periodID', 'startPeriod', 'endPeriod', 'periodName', 'isActive', 'registeredDate', 'unregisteredDate', 'detail'],
              where: {
                periodID: periodID
              }
            });

          case 5:
            dbAcademicPeriod = _context5.sent;

            if (!(dbAcademicPeriod === null || dbAcademicPeriod === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Period ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _AcademicPeriod["default"].update({
              startPeriod: startPeriod,
              endPeriod: endPeriod,
              periodName: periodName,
              detail: detail
            }, {
              where: {
                periodID: periodID
              }
            });

          case 12:
            _updateAcademicPeriod2 = _context5.sent;

            if (!_updateAcademicPeriod2) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Academic Period udated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Period ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Academic Period');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateAcademicPeriod.apply(this, arguments);
}

function deleteAcademicPeriod(_x11, _x12) {
  return _deleteAcademicPeriod.apply(this, arguments);
}

function _deleteAcademicPeriod() {
  _deleteAcademicPeriod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var periodID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            periodID = req.params.periodID;
            _context6.prev = 1;
            _context6.next = 4;
            return _AcademicPeriod["default"].destroy({
              where: {
                periodID: periodID
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
              message: 'Academic Period deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Period ID');

          case 10:
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Academic Period');

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteAcademicPeriod.apply(this, arguments);
}