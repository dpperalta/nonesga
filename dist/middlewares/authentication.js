"use strict";

var _User = _interopRequireDefault(require("../models/User"));

var _database = require("../database/database");

var _errors = require("../controllers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

/* ==================================
            TOKEN VALIDATION
   ================================== */
var roleName = '';

var tokenValidation = function tokenValidation(req, res, next) {
  var token = req.query.token;
  jwt.verify(token, SEED, function (error, decoded) {
    if (error) {
      return res.status(403).json({
        ok: false,
        message: 'ERROR: Wrong token',
        error: error
      });
    }

    req.user = decoded.user;
    next();
  });
};
/* ==================================
        SUPER ADMIN VALIDATION
   ================================== */


var superAdminValidation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, userID, roleName, dbUser, dbRole, role, name;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user;
            userID = user.userID;
            _context.prev = 2;
            dbUser = _User["default"].findOne({
              attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              where: {
                userID: userID
              }
            });

            if (dbUser) {
              _context.next = 8;
              break;
            }

            (0, _errors.returnNotFound)(res, 'User ID');
            _context.next = 14;
            break;

          case 8:
            dbRole = user.roleID;
            _context.next = 11;
            return _database.sequelize.query("\n                    SELECT r.\"roleName\" nameOfRole\n                    FROM role r\n                    WHERE r.\"roleID\" = ".concat(dbRole, ";        \n        "));

          case 11:
            role = _context.sent;
            name = role[0];
            roleName = name[0].nameofrole;

          case 14:
            if (!(roleName === 'Super Administrator')) {
              _context.next = 18;
              break;
            }

            next();
            _context.next = 19;
            break;

          case 18:
            return _context.abrupt("return", res.status(403).json({
              ok: false,
              message: 'ERROR! You do not have super powers',
              error: {
                message: 'Forbbiden action, contact with your administrator'
              }
            }));

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](2);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Super Administrator Validation');

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 21]]);
  }));

  return function superAdminValidation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/* ==================================
           ADMIN VALIDATION
   ================================== */


var adminValidation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, userID, roleName, dbUser, dbRole, role, name;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.user;
            userID = user.userID;
            _context2.prev = 2;
            dbUser = _User["default"].findOne({
              attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              where: {
                userID: userID
              }
            });

            if (dbUser) {
              _context2.next = 8;
              break;
            }

            (0, _errors.returnNotFound)(res, 'User ID');
            _context2.next = 14;
            break;

          case 8:
            dbRole = user.roleID;
            _context2.next = 11;
            return _database.sequelize.query("\n                    SELECT r.\"roleName\" nameOfRole\n                    FROM role r\n                    WHERE r.\"roleID\" = ".concat(dbRole, ";        \n        "));

          case 11:
            role = _context2.sent;
            name = role[0];
            roleName = name[0].nameofrole;

          case 14:
            if (!(roleName === 'Super Administrator' || roleName === 'Administrator')) {
              _context2.next = 18;
              break;
            }

            next();
            _context2.next = 19;
            break;

          case 18:
            return _context2.abrupt("return", res.status(403).json({
              ok: false,
              message: 'ERROR! You do not have powers',
              error: {
                message: 'Forbbiden action, contact with your administrator'
              }
            }));

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Administrator Validation');

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 21]]);
  }));

  return function adminValidation(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/* ==================================
           TEACHER VALIDATION
   ================================== */


var teacherValidation = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user, userID, roleName, dbUser, dbRole, role, name;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            userID = user.userID;
            _context3.prev = 2;
            dbUser = _User["default"].findOne({
              attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              where: {
                userID: userID
              }
            });

            if (dbUser) {
              _context3.next = 8;
              break;
            }

            (0, _errors.returnNotFound)(res, 'User ID');
            _context3.next = 14;
            break;

          case 8:
            dbRole = user.roleID;
            _context3.next = 11;
            return _database.sequelize.query("\n                    SELECT r.\"roleName\" nameOfRole\n                    FROM role r\n                    WHERE r.\"roleID\" = ".concat(dbRole, ";        \n        "));

          case 11:
            role = _context3.sent;
            name = role[0];
            roleName = name[0].nameofrole;

          case 14:
            if (!(roleName === 'Teacher' || roleName === 'Super Administrator' || roleName === 'Administrator')) {
              _context3.next = 18;
              break;
            }

            next();
            _context3.next = 19;
            break;

          case 18:
            return _context3.abrupt("return", res.status(403).json({
              ok: false,
              message: 'ERROR! You does not have enough teacher privileges',
              error: {
                message: 'Forbbiden action, contact with your administrator'
              }
            }));

          case 19:
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](2);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Administrator Validation');

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 21]]);
  }));

  return function teacherValidation(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/* ==================================
           OPERATIVE VALIDATION
   ================================== */


var operativeValidation = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var user, userID, roleName, dbUser, dbRole, role, name;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = req.user;
            userID = user.userID;
            _context4.prev = 2;
            dbUser = _User["default"].findOne({
              attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              where: {
                userID: userID
              }
            });

            if (dbUser) {
              _context4.next = 8;
              break;
            }

            (0, _errors.returnNotFound)(res, 'User ID');
            _context4.next = 14;
            break;

          case 8:
            dbRole = user.roleID;
            _context4.next = 11;
            return _database.sequelize.query("\n                    SELECT r.\"roleName\" nameOfRole\n                    FROM role r\n                    WHERE r.\"roleID\" = ".concat(dbRole, ";        \n        "));

          case 11:
            role = _context4.sent;
            name = role[0];
            roleName = name[0].nameofrole;

          case 14:
            if (!(roleName === 'Operative' || roleName === 'Super Administrator' || roleName === 'Administrator')) {
              _context4.next = 18;
              break;
            }

            next();
            _context4.next = 19;
            break;

          case 18:
            return _context4.abrupt("return", res.status(403).json({
              ok: false,
              message: 'ERROR! You does not have enough operative privileges',
              error: {
                message: 'Forbbiden action, contact with your administrator'
              }
            }));

          case 19:
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Operative Validation');

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 21]]);
  }));

  return function operativeValidation(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = {
  tokenValidation: tokenValidation,
  superAdminValidation: superAdminValidation,
  adminValidation: adminValidation,
  teacherValidation: teacherValidation,
  operativeValidation: operativeValidation
};