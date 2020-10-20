"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.logout = logout;
exports.tokenRenew = tokenRenew;

var _database = require("../database/database");

var _errors = require("./errors");

var _User = _interopRequireDefault(require("../models/User"));

var _Session = _interopRequireDefault(require("../models/Session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Imports for variables
var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var TOKEN_END = require('../config/config').TOKEN_END; // Function to login a user


function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, nick, pass, roleName, room, ip, device, code, loggedUser, dbRole, role, name, token, codeDate, month, isLogged;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, nick = _req$body.nick, pass = _req$body.pass;
            roleName = '';
            ip = req.connection.remoteAddress.toString();
            device = req.query.device || 'Web Application';
            _context.prev = 4;
            _context.next = 7;
            return _User["default"].findOne({
              attributes: ['userID', 'nick', 'email', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              where: {
                email: email
              }
            });

          case 7:
            loggedUser = _context.sent;

            if (loggedUser) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Incorrect authentication information - email'
            }));

          case 10:
            if (bcrypt.compareSync(pass, loggedUser.pass)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Incorrect authentication information - pass'
            }));

          case 12:
            if (loggedUser.isActive) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(300).json({
              ok: false,
              message: 'The user is disabled, please contact with your Administrator'
            }));

          case 14:
            dbRole = loggedUser.roleID;
            _context.next = 17;
            return _database.sequelize.query("\n                    SELECT r.\"roleName\" nameOfRole\n                    FROM role r\n                    WHERE r.\"roleID\" = ".concat(dbRole, ";        \n        "));

          case 17:
            role = _context.sent;
            name = role[0];
            roleName = name[0].nameofrole;
            loggedUser.pass = '|m|';
            token = jwt.sign({
              user: loggedUser
            }, SEED, {
              expiresIn: TOKEN_END
            });
            codeDate = new Date();
            month = codeDate.getMonth() + 1;
            code = codeDate.getDate().toString() + month.toString() + codeDate.getFullYear().toString() + loggedUser.userID;
            _context.next = 27;
            return _Session["default"].findOne({
              attributes: ['sessionID', 'sessionDate', 'sessionDevice', 'sessionIP', 'userID'],
              where: {
                userID: loggedUser.userID
              }
            });

          case 27:
            isLogged = _context.sent;

            if (!isLogged) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'User is already logged in since ' + isLogged.sessionDate + ' from ' + isLogged.sessionDevice
            }));

          case 32:
            _Session["default"].create({
              sessionRoom: room,
              sessionToken: token,
              sessionExpiration: TOKEN_END,
              sessionIP: ip,
              sessionDevice: device,
              sessionCode: code,
              userID: loggedUser.userID
            }, {
              fields: ['sessionRoom', 'sessionToken', 'sessionExpiration', 'sessionIP', 'sessionDevice', 'sessionCode', 'userID'],
              returning: ['sessionID', 'sessionRoom', 'sessionToken', 'sessionExpiration', 'sessionIP', 'sessionDevice', 'sessionCode', 'userID']
            });

          case 33:
            return _context.abrupt("return", res.status(200).json({
              ok: true,
              user: loggedUser,
              token: token,
              role: roleName
            }));

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](4);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Login');

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 36]]);
  }));
  return _login.apply(this, arguments);
}

function logout(_x3, _x4) {
  return _logout.apply(this, arguments);
} // Function to renew a token to refresh the login


function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userID, isLogged, _logout2;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userID = req.params.userID;
            _context2.prev = 1;
            _context2.next = 4;
            return _Session["default"].findOne({
              attributes: ['sessionID', 'sessionRoom', 'sessionDate', 'sessionToken', 'sessionExpiration', 'sessionCode', 'sessionDevice', 'sessionIP', 'userID'],
              where: {
                userID: userID
              }
            });

          case 4:
            isLogged = _context2.sent;

            if (!isLogged) {
              _context2.next = 13;
              break;
            }

            _context2.next = 8;
            return _Session["default"].destroy({
              where: {
                userID: userID
              }
            });

          case 8:
            _logout2 = _context2.sent;

            if (!(_logout2 > 0)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              message: 'User logged out successfully'
            }));

          case 11:
            _context2.next = 14;
            break;

          case 13:
            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              message: 'User is not logged yet'
            }));

          case 14:
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Logout');

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));
  return _logout.apply(this, arguments);
}

function tokenRenew(_x5, _x6) {
  return _tokenRenew.apply(this, arguments);
}

function _tokenRenew() {
  _tokenRenew = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var token, userID, userUpdate;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = jwt.sign({
              user: req.user
            }, SEED, {
              expiresIn: TOKEN_END
            });
            userID = req.user.userID;
            userUpdate = _Session["default"].findOne({
              attributes: ['sessionID', 'sessionRoom', 'sessionDate', 'sessionToken', 'sessionExpiration', 'sessionCode', 'sessionDevice', 'sessionIP', 'userID'],
              where: {
                userID: userID
              }
            });

            if (userUpdate) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              ok: false,
              message: 'User not authenticated or session has ended, please login again'
            }));

          case 7:
            _Session["default"].update({
              sessionToken: token,
              sessionDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                userID: userID
              }
            });

          case 8:
            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              token: token
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _tokenRenew.apply(this, arguments);
}