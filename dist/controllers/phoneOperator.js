"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPhoneOperator = createPhoneOperator;
exports.getPhoneOperators = getPhoneOperators;
exports.getPhoneOperator = getPhoneOperator;
exports.changeActivationPhoneOperator = changeActivationPhoneOperator;
exports.updatePhoneOperator = updatePhoneOperator;
exports.deletePhoneOperator = deletePhoneOperator;

var _PhoneOperator = _interopRequireDefault(require("../models/PhoneOperator"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Phone Operator
function createPhoneOperator(_x, _x2) {
  return _createPhoneOperator.apply(this, arguments);
} // Get all Phone Operators


function _createPhoneOperator() {
  _createPhoneOperator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, operatorName, detail, smsNumber, cost, observations, newPhoneOperator;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, operatorName = _req$body.operatorName, detail = _req$body.detail, smsNumber = _req$body.smsNumber, cost = _req$body.cost, observations = _req$body.observations;
            _context.prev = 1;
            _context.next = 4;
            return _PhoneOperator["default"].create({
              operatorName: operatorName,
              detail: detail,
              smsNumber: smsNumber,
              cost: cost,
              observations: observations
            }, {
              fields: ['operatorName', 'detail', 'smsNumber', 'cost', 'observations'],
              returning: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'isActive']
            });

          case 4:
            newPhoneOperator = _context.sent;

            if (!newPhoneOperator) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Phone Operator created successfully',
              operator: newPhoneOperator
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Phone Operator');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createPhoneOperator.apply(this, arguments);
}

function getPhoneOperators(_x3, _x4) {
  return _getPhoneOperators.apply(this, arguments);
} // Get the information of a Phone Operator by ID
// Get information of a city


function _getPhoneOperators() {
  _getPhoneOperators = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, phoneOperators;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _PhoneOperator["default"].findAndCountAll({
              attributes: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'unregisteredDate', 'isActive'],
              limit: limit,
              offset: from
            });

          case 5:
            phoneOperators = _context2.sent;

            if (!phoneOperators) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              phoneOperators: phoneOperators
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Phone Operator');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Phone Operators');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getPhoneOperators.apply(this, arguments);
}

function getPhoneOperator(_x5, _x6) {
  return _getPhoneOperator.apply(this, arguments);
} // Change to active or inactive to a phone operator


function _getPhoneOperator() {
  _getPhoneOperator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var operatorID, phoneOperator;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            operatorID = req.params.operatorID;
            _context3.prev = 1;
            _context3.next = 4;
            return _PhoneOperator["default"].findOne({
              attributes: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'unregisteredDate', 'isActive'],
              where: {
                operatorID: operatorID
              }
            });

          case 4:
            phoneOperator = _context3.sent;

            if (!phoneOperator) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              phoneOperator: phoneOperator
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Phone Operator ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Phone Operator by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getPhoneOperator.apply(this, arguments);
}

function changeActivationPhoneOperator(_x7, _x8) {
  return _changeActivationPhoneOperator.apply(this, arguments);
} // Update a Phone Operator


function _changeActivationPhoneOperator() {
  _changeActivationPhoneOperator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var operatorID, type, value, action, afirmation, negation, changeActivationJSON, dbPhoneOperator, changeActivation;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            operatorID = req.params.operatorID;
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

            _context4.prev = 6;
            _context4.next = 9;
            return _PhoneOperator["default"].findOne({
              attributes: ['operatorID', 'operatorName', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                operatorID: operatorID
              }
            });

          case 9:
            dbPhoneOperator = _context4.sent;

            if (!dbPhoneOperator) {
              _context4.next = 21;
              break;
            }

            _context4.next = 13;
            return _PhoneOperator["default"].update(changeActivationJSON, {
              where: {
                operatorID: operatorID,
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
              message: 'Phone Operator ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context4.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error while ' + action + ' a Phone Operator or Phone Operator already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context4.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Phone Operator ID');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](6);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Change Activation Phone Operator');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 24]]);
  }));
  return _changeActivationPhoneOperator.apply(this, arguments);
}

function updatePhoneOperator(_x9, _x10) {
  return _updatePhoneOperator.apply(this, arguments);
} // Delte a Phone Operator


function _updatePhoneOperator() {
  _updatePhoneOperator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var operatorID, _req$body2, operatorName, detail, smsNumber, cost, observations, dbPhoneOperator, updatedPhoneOperator;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            operatorID = req.params.operatorID;
            _req$body2 = req.body, operatorName = _req$body2.operatorName, detail = _req$body2.detail, smsNumber = _req$body2.smsNumber, cost = _req$body2.cost, observations = _req$body2.observations;
            _context5.prev = 2;
            _context5.next = 5;
            return _PhoneOperator["default"].findOne({
              attributes: ['operatorID', 'operatorName', 'detail', 'smsNumber', 'cost', 'observations', 'registeredDate', 'unregisteredDate', 'isActive'],
              where: {
                operatorID: operatorID
              }
            });

          case 5:
            dbPhoneOperator = _context5.sent;

            if (!(dbPhoneOperator === null || dbPhoneOperator === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Phone Operator ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _PhoneOperator["default"].update({
              operatorName: operatorName,
              detail: detail,
              smsNumber: smsNumber,
              cost: cost,
              observations: observations
            }, {
              where: {
                operatorID: operatorID
              }
            });

          case 12:
            updatedPhoneOperator = _context5.sent;

            if (!updatedPhoneOperator) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Phone Operator updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Phone Operator ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Phone Operator');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updatePhoneOperator.apply(this, arguments);
}

function deletePhoneOperator(_x11, _x12) {
  return _deletePhoneOperator.apply(this, arguments);
}

function _deletePhoneOperator() {
  _deletePhoneOperator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var operatorID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            operatorID = req.params.operatorID;
            _context6.prev = 1;
            _context6.next = 4;
            return _PhoneOperator["default"].destroy({
              where: {
                operatorID: operatorID
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
              message: 'Phone Operator deleted successfuylly'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Phone Operator ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Phone Operator');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deletePhoneOperator.apply(this, arguments);
}