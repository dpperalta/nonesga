"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEnrollmentStatus = createEnrollmentStatus;
exports.getAllEnrollmentStatus = getAllEnrollmentStatus;
exports.updateEnrollmentStatus = updateEnrollmentStatus;
exports.getEnrollmentStatus = getEnrollmentStatus;
exports.changeActivationEnrollmentStatus = changeActivationEnrollmentStatus;
exports.deleteEnrollmentStatus = deleteEnrollmentStatus;

var _EnrollmentStatus = _interopRequireDefault(require("../models/EnrollmentStatus"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create new Enrollment Status
function createEnrollmentStatus(_x, _x2) {
  return _createEnrollmentStatus.apply(this, arguments);
} // Get all Enrollment Status


function _createEnrollmentStatus() {
  _createEnrollmentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, code, description, detail, newEnrollmentStatus;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, code = _req$body.code, description = _req$body.description, detail = _req$body.detail;
            _context.prev = 1;
            _context.next = 4;
            return _EnrollmentStatus["default"].create({
              code: code,
              description: description,
              detail: detail
            }, {
              fields: ['code', 'description', 'detail'],
              returning: ['statusID', 'code', 'description', 'isActive', 'detail']
            });

          case 4:
            newEnrollmentStatus = _context.sent;

            if (!newEnrollmentStatus) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Enrollment Status created successfully',
              enrollmentStatus: newEnrollmentStatus
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error: ', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Enrollment Status');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createEnrollmentStatus.apply(this, arguments);
}

function getAllEnrollmentStatus(_x3, _x4) {
  return _getAllEnrollmentStatus.apply(this, arguments);
} // Update an Enrollment Status


function _getAllEnrollmentStatus() {
  _getAllEnrollmentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, allEnrollmentStatus;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _EnrollmentStatus["default"].findAndCountAll({
              attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
              order: [['code', 'ASC']]
            });

          case 5:
            allEnrollmentStatus = _context2.sent;

            if (!allEnrollmentStatus) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              allEnrollmentStatus: allEnrollmentStatus
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Enrollment Status');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error: ', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Enrollment Status');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getAllEnrollmentStatus.apply(this, arguments);
}

function updateEnrollmentStatus(_x5, _x6) {
  return _updateEnrollmentStatus.apply(this, arguments);
} // Get information of an enrollment status by ID


function _updateEnrollmentStatus() {
  _updateEnrollmentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var statusID, _req$body2, code, description, detail, dbEnrollmentStatus, updatedEnrollmentStatus;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            statusID = req.params.statusID;
            _req$body2 = req.body, code = _req$body2.code, description = _req$body2.description, detail = _req$body2.detail;
            _context3.prev = 2;
            _context3.next = 5;
            return _EnrollmentStatus["default"].findOne({
              attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
              where: {
                statusID: statusID
              }
            });

          case 5:
            dbEnrollmentStatus = _context3.sent;

            if (!(dbEnrollmentStatus === null | dbEnrollmentStatus === undefined)) {
              _context3.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Status ID');
            _context3.next = 18;
            break;

          case 10:
            _context3.next = 12;
            return _EnrollmentStatus["default"].update({
              code: code,
              description: description,
              detail: detail
            }, {
              where: {
                statusID: statusID
              }
            });

          case 12:
            updatedEnrollmentStatus = _context3.sent;

            if (!updatedEnrollmentStatus) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Enrollment Status updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Status ID');

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](2);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Update Enrollment Status');

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 20]]);
  }));
  return _updateEnrollmentStatus.apply(this, arguments);
}

function getEnrollmentStatus(_x7, _x8) {
  return _getEnrollmentStatus.apply(this, arguments);
} // Change activation status


function _getEnrollmentStatus() {
  _getEnrollmentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var statusID, enrollmentStatus;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            statusID = req.params.statusID;
            _context4.prev = 1;
            _context4.next = 4;
            return _EnrollmentStatus["default"].findOne({
              attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
              where: {
                statusID: statusID
              }
            });

          case 4:
            enrollmentStatus = _context4.sent;

            if (!enrollmentStatus) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              enrollmentStatus: enrollmentStatus
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Status ID');

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log('Error: ', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get an Enrollment Status');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return _getEnrollmentStatus.apply(this, arguments);
}

function changeActivationEnrollmentStatus(_x9, _x10) {
  return _changeActivationEnrollmentStatus.apply(this, arguments);
} // Delete an Enrollment Status


function _changeActivationEnrollmentStatus() {
  _changeActivationEnrollmentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var statusID, type, value, action, afirmation, negation, changeActivationJSON, dbEnrollmentStatus, changeActivation;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            statusID = req.params.statusID;
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

            _context5.prev = 6;
            _context5.next = 9;
            return _EnrollmentStatus["default"].findOne({
              attributes: ['statusID', 'code', 'description', 'isActive', 'detail'],
              where: {
                statusID: statusID
              }
            });

          case 9:
            dbEnrollmentStatus = _context5.sent;

            if (!dbEnrollmentStatus) {
              _context5.next = 21;
              break;
            }

            _context5.next = 13;
            return _EnrollmentStatus["default"].update(changeActivationJSON, {
              where: {
                statusID: statusID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context5.sent;

            if (!(changeActivation > 0)) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Enrollment Status ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context5.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error while ' + action + ' a Enrollment Status or Enrollment Status already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context5.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Enrollment Status ID');

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Change Activation Enrollment Status');

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 24]]);
  }));
  return _changeActivationEnrollmentStatus.apply(this, arguments);
}

function deleteEnrollmentStatus(_x11, _x12) {
  return _deleteEnrollmentStatus.apply(this, arguments);
}

function _deleteEnrollmentStatus() {
  _deleteEnrollmentStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var statusID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            statusID = req.params.statusID;
            _context6.prev = 1;
            _context6.next = 4;
            return _EnrollmentStatus["default"].destroy({
              where: {
                statusID: statusID
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
              message: 'Enrollment Status deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Status ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error: ', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Enrollment Status');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteEnrollmentStatus.apply(this, arguments);
}