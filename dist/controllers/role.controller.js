"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRole = createRole;
exports.getRoles = getRoles;
exports.getActiveRolesWithCounter = getActiveRolesWithCounter;
exports.getActiveRolesWitoutCounter = getActiveRolesWitoutCounter;
exports.updateRole = updateRole;
exports.inactivateRole = inactivateRole;
exports.activateRole = activateRole;
exports.deleteRole = deleteRole;

var _Role = _interopRequireDefault(require("../models/Role"));

var _ErrorLog = _interopRequireDefault(require("../models/ErrorLog"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createRole(_x, _x2) {
  return _createRole.apply(this, arguments);
}

function _createRole() {
  _createRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, roleCode, roleName, privileges, description, newRole;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, roleCode = _req$body.roleCode, roleName = _req$body.roleName, privileges = _req$body.privileges, description = _req$body.description;
            _context.prev = 1;
            _context.next = 4;
            return _Role["default"].create({
              roleCode: roleCode,
              roleName: roleName,
              privileges: privileges,
              description: description
            }, {
              fields: ['roleCode', 'roleName', 'privileges', 'description'],
              returning: ['roleID', 'roleCode', 'roleName', 'privileges', 'description', 'isActive', 'registeredDate', 'unregisteredDate']
            });

          case 4:
            newRole = _context.sent;

            if (!newRole) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Role created successfully',
              role: newRole
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            returnError(res, _context.t0, 'createRole');
            /*return res.status(500).json({
                ok: false,
                message: 'Internal Server Error',
                error: e//e.original.detail
            });*/

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createRole.apply(this, arguments);
}

function getRoles(_x3, _x4) {
  return _getRoles.apply(this, arguments);
}

function _getRoles() {
  _getRoles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var roles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Role["default"].findAll({
              attributes: ['roleID', 'roleCode', 'roleName', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate'],
              order: [['roleID', 'ASC']]
            });

          case 3:
            roles = _context2.sent;

            if (!(roles.length > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              roles: roles
            }));

          case 8:
            return _context2.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Any role was founded',
              error: {
                message: 'Could not find any role, contact to administrator'
              }
            }));

          case 9:
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log('Error:', _context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              ok: false,
              message: 'An Database error occurrs',
              error: _context2.t0
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _getRoles.apply(this, arguments);
}

function getActiveRolesWithCounter(_x5, _x6) {
  return _getActiveRolesWithCounter.apply(this, arguments);
}

function _getActiveRolesWithCounter() {
  _getActiveRolesWithCounter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var limit, from, roles;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context3.prev = 2;
            _context3.next = 5;
            return _Role["default"].findAndCountAll({
              attributes: ['roleID', 'roleCode', 'roleName', 'description', 'isActive'],
              where: {
                'isActive': true
              },
              limit: limit,
              offset: from
            });

          case 5:
            roles = _context3.sent;

            if (!(roles.count > 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              roles: roles
            }));

          case 10:
            returnNotFound(res, 'Active Role');

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](2);
            console.log('Error: ', _context3.t0);
            returnError(res, _context3.t0);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 13]]);
  }));
  return _getActiveRolesWithCounter.apply(this, arguments);
}

function getActiveRolesWitoutCounter(_x7, _x8) {
  return _getActiveRolesWitoutCounter.apply(this, arguments);
}

function _getActiveRolesWitoutCounter() {
  _getActiveRolesWitoutCounter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var roles;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Role["default"].findAll({
              attributes: ['roleID', 'roleCode', 'roleName', 'description', 'privileges', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                'isActive': true
              }
            });

          case 3:
            roles = _context4.sent;

            if (!(roles.length > 0)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              roles: roles
            }));

          case 8:
            return _context4.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Any active role finded',
              error: {
                message: 'Could not find any active role, contact to administrator'
              }
            }));

          case 9:
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.log('Error: ', _context4.t0);
            returnError(res, _context4.t0);
            /*return res.status(500).json({
                ok: false,
                message: 'A Database error occurrs',
                error: e
            });*/

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _getActiveRolesWitoutCounter.apply(this, arguments);
}

function updateRole(_x9, _x10) {
  return _updateRole.apply(this, arguments);
}

function _updateRole() {
  _updateRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var roleID, _req$body2, roleCode, roleName, privileges, description, isActive, unregisteredDate, role, updatedRole;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            roleID = req.params.roleID;
            _req$body2 = req.body, roleCode = _req$body2.roleCode, roleName = _req$body2.roleName, privileges = _req$body2.privileges, description = _req$body2.description, isActive = _req$body2.isActive, unregisteredDate = _req$body2.unregisteredDate;
            console.log('roleID:', roleID);
            _context5.prev = 3;
            _context5.next = 6;
            return _Role["default"].findOne({
              attributes: ['roleCode', 'roleName', 'privileges', 'description', 'isActive', 'unregisteredDate'],
              where: {
                roleID: roleID
              },
              returning: ['roleID', 'roleCode', 'roleName', 'descirption', 'privileges', 'isActive', 'unregisteredDate']
            });

          case 6:
            role = _context5.sent;

            if (!(role === null || role === undefined)) {
              _context5.next = 11;
              break;
            }

            returnNotFound(res, 'Role ID');
            _context5.next = 16;
            break;

          case 11:
            _context5.next = 13;
            return _Role["default"].update({
              roleCode: roleCode,
              roleName: roleName,
              privileges: privileges,
              description: description,
              isActive: isActive,
              unregisteredDate: unregisteredDate
            }, {
              where: {
                roleID: roleID
              }
            });

          case 13:
            updatedRole = _context5.sent;

            if (!updateRole) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Role updated successfully',
              count: updatedRole
            }));

          case 16:
            _context5.next = 22;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](3);
            console.log('Error:', _context5.t0);
            returnError(res, _context5.t0);

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 18]]);
  }));
  return _updateRole.apply(this, arguments);
}

function inactivateRole(_x11, _x12) {
  return _inactivateRole.apply(this, arguments);
}

function _inactivateRole() {
  _inactivateRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var roleID, isActive, role, _inactivateRole2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            roleID = req.params.roleID;
            isActive = false;
            _context6.prev = 2;
            _context6.next = 5;
            return _Role["default"].findOne({
              attributes: ['roleCode', 'roleName', 'privileges', 'description', 'isActive', 'unregisteredDate'],
              where: {
                roleID: roleID
              },
              returning: ['roleID', 'roleCode', 'roleName', 'descirption', 'privileges', 'isActive', 'unregisteredDate']
            });

          case 5:
            role = _context6.sent;

            if (!role) {
              _context6.next = 19;
              break;
            }

            _context6.next = 9;
            return _Role["default"].update({
              isActive: isActive,
              unregisteredDate: _database.sequelize.fn('NOW')
            }, {
              where: {
                roleID: roleID
              }
            });

          case 9:
            _inactivateRole2 = _context6.sent;
            console.log('result', _inactivateRole2);

            if (!(_inactivateRole2 > 0)) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Role inactivated successfully'
            }));

          case 15:
            console.log('Error 0');
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while inactivating role'
            }));

          case 17:
            _context6.next = 20;
            break;

          case 19:
            returnNotFound(res, 'Active Role');

          case 20:
            _context6.next = 26;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            returnError(res, _context6.t0);

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 22]]);
  }));
  return _inactivateRole.apply(this, arguments);
}

function activateRole(_x13, _x14) {
  return _activateRole.apply(this, arguments);
}

function _activateRole() {
  _activateRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var roleID, isActive, role, _inactivateRole3;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            roleID = req.params.roleID;
            isActive = true;
            _context7.prev = 2;
            _context7.next = 5;
            return _Role["default"].findOne({
              attributes: ['roleCode', 'roleName', 'privileges', 'description', 'isActive', 'unregisteredDate'],
              where: {
                roleID: roleID
              },
              returning: ['roleID', 'roleCode', 'roleName', 'descirption', 'privileges', 'isActive', 'unregisteredDate']
            });

          case 5:
            role = _context7.sent;

            if (!role) {
              _context7.next = 19;
              break;
            }

            _context7.next = 9;
            return _Role["default"].update({
              isActive: isActive,
              registeredDate: _database.sequelize.fn('NOW')
            }, {
              where: {
                roleID: roleID
              }
            });

          case 9:
            _inactivateRole3 = _context7.sent;
            console.log('result', _inactivateRole3);

            if (!(_inactivateRole3 > 0)) {
              _context7.next = 15;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Role activated successfully'
            }));

          case 15:
            console.log('Error 0');
            return _context7.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while activating role'
            }));

          case 17:
            _context7.next = 20;
            break;

          case 19:
            returnNotFound(res, 'Active Role');

          case 20:
            _context7.next = 26;
            break;

          case 22:
            _context7.prev = 22;
            _context7.t0 = _context7["catch"](2);
            console.log('Error:', _context7.t0);
            returnError(res, _context7.t0);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 22]]);
  }));
  return _activateRole.apply(this, arguments);
}

function deleteRole(_x15, _x16) {
  return _deleteRole.apply(this, arguments);
}

function _deleteRole() {
  _deleteRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var roleID, countDeleted;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            roleID = req.params.roleID;
            _context8.prev = 1;
            _context8.next = 4;
            return _Role["default"].destroy({
              where: {
                roleID: roleID
              }
            });

          case 4:
            countDeleted = _context8.sent;

            if (!(countDeleted > 0)) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Role deleted successfully'
            }));

          case 9:
            returnNotFound(res, 'Role ID: ' + roleID + ',');

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log('Error', _context8.t0);
            returnError(res, _context8.t0);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));
  return _deleteRole.apply(this, arguments);
}

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