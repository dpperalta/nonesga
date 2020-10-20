"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPersonType = createPersonType;
exports.getPersonTypes = getPersonTypes;
exports.getActivePersonTypes = getActivePersonTypes;
exports.updatePersonType = updatePersonType;
exports.inactivatePersonType = inactivatePersonType;
exports.activatePersonType = activatePersonType;
exports.deletePersonType = deletePersonType;

var _PersonType = _interopRequireDefault(require("../models/PersonType"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Function to create a person type
function createPersonType(_x, _x2) {
  return _createPersonType.apply(this, arguments);
} // Function to get all persons types


function _createPersonType() {
  _createPersonType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, personType, typeName, details, newPersonType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, personType = _req$body.personType, typeName = _req$body.typeName, details = _req$body.details;
            _context.prev = 1;
            _context.next = 4;
            return _PersonType["default"].create({
              personType: personType,
              typeName: typeName,
              details: details
            }, {
              fields: ['personType', 'typeName', 'details'],
              returning: ['personTypeID', 'personType', 'typeName', 'registeredDate', 'details', 'isActive']
            });

          case 4:
            newPersonType = _context.sent;

            if (!newPersonType) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person Type created successfully',
              personType: newPersonType
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Person Type');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createPersonType.apply(this, arguments);
}

function getPersonTypes(_x3, _x4) {
  return _getPersonTypes.apply(this, arguments);
} // Function to get only active person types


function _getPersonTypes() {
  _getPersonTypes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var personTypes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _PersonType["default"].findAll({
              attributes: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'registeredDate', 'unregisteredDate'],
              order: [['personTypeID', 'ASC']]
            });

          case 3:
            personTypes = _context2.sent;

            if (!(personTypes.length > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              personTypes: personTypes
            }));

          case 8:
            (0, _errors.returnNotFound)(res, 'Person Type');

          case 9:
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log('Error:', _context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _getPersonTypes.apply(this, arguments);
}

function getActivePersonTypes(_x5, _x6) {
  return _getActivePersonTypes.apply(this, arguments);
} // Update a Person Type providing personTypeID


function _getActivePersonTypes() {
  _getActivePersonTypes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var limit, from, personTypes;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context3.prev = 2;
            _context3.next = 5;
            return _PersonType["default"].findAndCountAll({
              attributes: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'registeredDate'],
              where: {
                'isActive': true
              },
              limit: limit,
              offset: from
            });

          case 5:
            personTypes = _context3.sent;

            if (!(personTypes.count > 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              personTypes: personTypes
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Active Person Types');

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](2);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get all Active Person Type');

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 13]]);
  }));
  return _getActivePersonTypes.apply(this, arguments);
}

function updatePersonType(_x7, _x8) {
  return _updatePersonType.apply(this, arguments);
} // Inactive a Person Type


function _updatePersonType() {
  _updatePersonType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var personTypeID, _req$body2, personType, typeName, details, dbPersonType, _updatePersonType2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            personTypeID = req.params.personTypeID;
            _req$body2 = req.body, personType = _req$body2.personType, typeName = _req$body2.typeName, details = _req$body2.details;
            _context4.prev = 2;
            _context4.next = 5;
            return _PersonType["default"].findOne({
              attributes: ['personType', 'typeName', 'details'],
              where: {
                personTypeID: personTypeID
              },
              returning: ['personTypeID', 'personType', 'typeName', 'details', 'registeredDate', 'unregisteredDate', 'isActive']
            });

          case 5:
            dbPersonType = _context4.sent;

            if (!(dbPersonType === null || dbPersonType === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Person Type ID');
            _context4.next = 14;
            break;

          case 10:
            _context4.next = 12;
            return _PersonType["default"].update({
              personType: personType,
              typeName: typeName,
              details: details
            }, {
              where: {
                personTypeID: personTypeID
              }
            });

          case 12:
            _updatePersonType2 = _context4.sent;

            if (_updatePersonType2) {
              res.status(200).json({
                ok: true,
                message: 'Person Type updated successfully',
                count: _updatePersonType2
              });
            }

          case 14:
            _context4.next = 20;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update Person Type');

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 16]]);
  }));
  return _updatePersonType.apply(this, arguments);
}

function inactivatePersonType(_x9, _x10) {
  return _inactivatePersonType.apply(this, arguments);
} // Activate a Person Type


function _inactivatePersonType() {
  _inactivatePersonType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var personTypeID, isActive, dbPersonType, _inactivatePersonType2;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            personTypeID = req.params.personTypeID;
            isActive = false;
            _context5.prev = 2;
            _context5.next = 5;
            return _PersonType["default"].findOne({
              attributes: ['personType', 'typeName', 'details', 'isActive', 'unregisteredDate'],
              where: {
                personTypeID: personTypeID
              },
              returning: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'regsiteredDate', 'unregisteredDate']
            });

          case 5:
            dbPersonType = _context5.sent;

            if (!dbPersonType) {
              _context5.next = 17;
              break;
            }

            _context5.next = 9;
            return _PersonType["default"].update({
              isActive: isActive,
              unregisteredDate: _database.sequelize.fn('NOW')
            }, {
              where: {
                personTypeID: personTypeID,
                isActive: true
              }
            });

          case 9:
            _inactivatePersonType2 = _context5.sent;

            if (!(_inactivatePersonType2 > 0)) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person Type inactivated successfully'
            }));

          case 14:
            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while inactivating a Person Type or Person Type already inactive',
              error: 'Error 0'
            }));

          case 15:
            _context5.next = 18;
            break;

          case 17:
            (0, _errors.returnNotFound)(res, 'Active Person Type');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Inactivate Person Type');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _inactivatePersonType.apply(this, arguments);
}

function activatePersonType(_x11, _x12) {
  return _activatePersonType.apply(this, arguments);
}

function _activatePersonType() {
  _activatePersonType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var personTypeID, isActive, dbPersonType, _activatePersonType2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            personTypeID = req.params.personTypeID;
            isActive = true;
            _context6.prev = 2;
            _context6.next = 5;
            return _PersonType["default"].findOne({
              attributes: ['personType', 'typeName', 'details', 'isActive', 'unregisteredDate'],
              where: {
                personTypeID: personTypeID
              },
              returning: ['personTypeID', 'personType', 'typeName', 'details', 'isActive', 'regsiteredDate', 'unregisteredDate']
            });

          case 5:
            dbPersonType = _context6.sent;

            if (!dbPersonType) {
              _context6.next = 17;
              break;
            }

            _context6.next = 9;
            return _PersonType["default"].update({
              isActive: isActive
            }, {
              where: {
                personTypeID: personTypeID,
                isActive: false
              }
            });

          case 9:
            _activatePersonType2 = _context6.sent;

            if (!(_activatePersonType2 > 0)) {
              _context6.next = 14;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person Type activated successfully'
            }));

          case 14:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while activating a Person Type or Person Type already active',
              error: 'Error 0'
            }));

          case 15:
            _context6.next = 18;
            break;

          case 17:
            (0, _errors.returnNotFound)(res, 'Inactivate Person Type');

          case 18:
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            console.log('Error', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Activate Person Type');

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 20]]);
  }));
  return _activatePersonType.apply(this, arguments);
}

function deletePersonType(_x13, _x14) {
  return _deletePersonType.apply(this, arguments);
}

function _deletePersonType() {
  _deletePersonType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var personTypeID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            personTypeID = req.params.personTypeID;
            _context7.prev = 1;
            _context7.next = 4;
            return _PersonType["default"].destroy({
              where: {
                personTypeID: personTypeID
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
              message: 'Person Type deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Person Type ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Delete Person Type');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deletePersonType.apply(this, arguments);
}