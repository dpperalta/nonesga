"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTelephone = createTelephone;
exports.getTelephones = getTelephones;
exports.getTelephone = getTelephone;
exports.updateTelephone = updateTelephone;
exports.changeActivationTelephone = changeActivationTelephone;
exports.deleteTelephone = deleteTelephone;
exports.getPersonTelephones = getPersonTelephones;

var _Telephone = _interopRequireDefault(require("../models/Telephone"));

var _PhoneOperator = _interopRequireDefault(require("../models/PhoneOperator"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Telephone
function createTelephone(_x, _x2) {
  return _createTelephone.apply(this, arguments);
} // Get telephones


function _createTelephone() {
  _createTelephone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, number, phoneName, detail, isFavourite, isWork, phoneType, operatorID, personID, newTelephone;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, number = _req$body.number, phoneName = _req$body.phoneName, detail = _req$body.detail, isFavourite = _req$body.isFavourite, isWork = _req$body.isWork, phoneType = _req$body.phoneType, operatorID = _req$body.operatorID, personID = _req$body.personID;
            _context.prev = 1;
            _context.next = 4;
            return _Telephone["default"].create({
              number: number,
              phoneName: phoneName,
              detail: detail,
              isFavourite: isFavourite,
              isWork: isWork,
              phoneType: phoneType,
              operatorID: operatorID,
              personID: personID
            }, {
              fields: ['number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'operatorID', 'personID'],
              returning: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite']
            });

          case 4:
            newTelephone = _context.sent;

            if (!newTelephone) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Telephone created successfully',
              telephone: newTelephone
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Telephone');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createTelephone.apply(this, arguments);
}

function getTelephones(_x3, _x4) {
  return _getTelephones.apply(this, arguments);
} // Get a telephone


function _getTelephones() {
  _getTelephones = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, telephones;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Telephone["default"].findAndCountAll({
              attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'registeredDate', 'unregisteredDate', 'isActive', 'operatorID', 'personID'],
              where: {
                isActive: true
              },
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }, {
                model: _PhoneOperator["default"],
                attributes: ['operatorID', 'operatorName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            telephones = _context2.sent;

            if (!(telephones.count > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              telephones: telephones
            }));

          case 8:
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Telephones');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));
  return _getTelephones.apply(this, arguments);
}

function getTelephone(_x5, _x6) {
  return _getTelephone.apply(this, arguments);
} // Update a telephone


function _getTelephone() {
  _getTelephone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var telephoneID, telephone;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            telephoneID = req.params.telephoneID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Telephone["default"].findOne({
              attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'registeredDate', 'unregisteredDate', 'isActive', 'operatorID', 'personID'],
              where: {
                telephoneID: telephoneID
              },
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }, {
                model: _PhoneOperator["default"],
                attributes: ['operatorID', 'operatorName']
              }]
            });

          case 4:
            telephone = _context3.sent;

            if (!telephone) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              telephone: telephone
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Telephone ID');

          case 10:
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getTelephone.apply(this, arguments);
}

function updateTelephone(_x7, _x8) {
  return _updateTelephone.apply(this, arguments);
} // Change to active or inactive a telephone


function _updateTelephone() {
  _updateTelephone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var telephoneID, _req$body2, number, phoneName, detail, isFavourite, isWork, phoneType, operatorID, personID, dbTelephone, favourite, updatedTelephone;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            telephoneID = req.params.telephoneID;
            _req$body2 = req.body, number = _req$body2.number, phoneName = _req$body2.phoneName, detail = _req$body2.detail, isFavourite = _req$body2.isFavourite, isWork = _req$body2.isWork, phoneType = _req$body2.phoneType, operatorID = _req$body2.operatorID, personID = _req$body2.personID;
            _context4.prev = 2;
            _context4.next = 5;
            return _Telephone["default"].findOne({
              attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType', 'registeredDate', 'unregisteredDate', 'operatorID', 'personID'],
              where: {
                telephoneID: telephoneID
              }
            });

          case 5:
            dbTelephone = _context4.sent;

            if (!(dbTelephone === null || dbTelephone === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Telephone ID');
            _context4.next = 22;
            break;

          case 10:
            if (!isFavourite) {
              _context4.next = 14;
              break;
            }

            _context4.next = 13;
            return _database.sequelize.query("\n                    update \"telephone\"\n                        set \"isFavourite\" = false\n                        where \"personID\" = ".concat(dbTelephone.personID, "\n                            and \"telephoneID\" != ").concat(telephoneID, ";\n                "));

          case 13:
            favourite = _context4.sent;

          case 14:
            _context4.next = 16;
            return _Telephone["default"].update({
              number: number,
              phoneName: phoneName,
              detail: detail,
              isFavourite: isFavourite,
              isWork: isWork,
              phoneType: phoneType,
              operatorID: operatorID,
              personID: personID
            }, {
              where: {
                telephoneID: telephoneID
              }
            });

          case 16:
            updatedTelephone = _context4.sent;

            if (!updatedTelephone) {
              _context4.next = 21;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Telephone updated successfully'
            }));

          case 21:
            (0, _errors.returnNotFound)(res, 'Telephone ID');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update Telephone');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 24]]);
  }));
  return _updateTelephone.apply(this, arguments);
}

function changeActivationTelephone(_x9, _x10) {
  return _changeActivationTelephone.apply(this, arguments);
} // Physical Delete a telephone


function _changeActivationTelephone() {
  _changeActivationTelephone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var telephoneID, type, value, action, afirmation, negation, changeActivationJSON, dbTelephone, changeActivation;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            telephoneID = req.params.telephoneID;
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

            _context5.prev = 6;
            _context5.next = 9;
            return _Telephone["default"].findOne({
              attributes: ['telephoneID', 'number', 'phoneName', 'detail', 'isFavourite', 'isWork', 'phoneType'],
              where: {
                telephoneID: telephoneID
              }
            });

          case 9:
            dbTelephone = _context5.sent;

            if (!dbTelephone) {
              _context5.next = 21;
              break;
            }

            _context5.next = 13;
            return _Telephone["default"].update(changeActivationJSON, {
              where: {
                telephoneID: telephoneID,
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
              message: 'Telephone ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Telephone or Telephone already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context5.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Telephone ID');

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Change Activation Telephone');

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 24]]);
  }));
  return _changeActivationTelephone.apply(this, arguments);
}

function deleteTelephone(_x11, _x12) {
  return _deleteTelephone.apply(this, arguments);
} // Get phone information of a person


function _deleteTelephone() {
  _deleteTelephone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var telephoneID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            telephoneID = req.params.telephoneID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Telephone["default"].destroy({
              where: {
                telephoneID: telephoneID
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
              message: 'Telephone deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Telephone ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Telephone ID');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteTelephone.apply(this, arguments);
}

function getPersonTelephones(_x13, _x14) {
  return _getPersonTelephones.apply(this, arguments);
}

function _getPersonTelephones() {
  _getPersonTelephones = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var personID, limit, from, rows, totalRows, total, telephones;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            personID = req.params.personID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context7.prev = 3;
            _context7.next = 6;
            return _database.sequelize.query("\n        select count(*) \n        from \"telephone\", \"phoneOperator\", \"person\", \"user\"\n        where \"telephone\".\"operatorID\" = \"phoneOperator\".\"operatorID\"\n            and \"telephone\".\"personID\" = \"person\".\"personID\"\n            and \"person\".\"personID\" = \"user\".\"personID\"\n            and \"person\".\"personID\" = ".concat(personID, "\n            and \"telephone\".\"isActive\" = true;\n        "));

          case 6:
            total = _context7.sent;
            rows = total[0];
            totalRows = parseInt(rows[0].count);
            _context7.next = 11;
            return _database.sequelize.query("\n            select \"telephone\".\"telephoneID\" tid,\n                    \"telephone\".\"number\" tnumber,\n                    \"telephone\".\"phoneName\" tname,\n                    \"telephone\".\"detail\" tdetail,\n                    \"telephone\".\"isFavourite\" tfav,\n                    \"telephone\".\"isWork\" twork,\n                    \"telephone\".\"isActive\" tactive,\n                    \"person\".\"completeName\" pname,\n                    \"phoneOperator\".\"operatorName\" oname\n            from \"telephone\", \"phoneOperator\", \"person\", \"user\"\n            where \"telephone\".\"operatorID\" = \"phoneOperator\".\"operatorID\"\n                and \"telephone\".\"personID\" = \"person\".\"personID\"\n                and \"person\".\"personID\" = \"user\".\"personID\"\n                and \"person\".\"personID\" = ".concat(personID, "\n                and \"telephone\".\"isActive\" = true\n                order by \"telephone\".\"isFavourite\" DESC\n                limit ").concat(limit, "\n                offset ").concat(from, ";\n        "));

          case 11:
            telephones = _context7.sent;

            if (!telephones) {
              _context7.next = 20;
              break;
            }

            if (!(totalRows > 0)) {
              _context7.next = 17;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              telephones: telephones[0],
              total: totalRows
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Person ID', 'Telephone search');

          case 18:
            _context7.next = 21;
            break;

          case 20:
            (0, _errors.returnWrongError)(res, 'Person ID');

          case 21:
            _context7.next = 27;
            break;

          case 23:
            _context7.prev = 23;
            _context7.t0 = _context7["catch"](3);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Get Telephones of Person');

          case 27:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 23]]);
  }));
  return _getPersonTelephones.apply(this, arguments);
}