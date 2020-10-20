"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultUser = createDefaultUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.changeActivationUser = changeActivationUser;
exports.createUser = createUser;
exports.getCollegeUser = getCollegeUser;

var _User = _interopRequireDefault(require("../models/User"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcryptjs'); // Create a default user


function createDefaultUser(_x, _x2) {
  return _createDefaultUser.apply(this, arguments);
} // Get information of all users


function _createDefaultUser() {
  _createDefaultUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, pass, nick, salt, cryptoPass, roleID, roleName, roledb, role, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, pass = _req$body.pass, nick = _req$body.nick;
            salt = bcrypt.genSaltSync();
            cryptoPass = bcrypt.hashSync(pass, salt);
            console.log('Pass', pass);
            console.log('CryptoPass:', cryptoPass);
            _context.prev = 5;
            _context.next = 8;
            return _database.sequelize.query("\n                    SELECT  r.\"roleID\" identificador,\n                            r.\"roleName\" nombre\n                    FROM role r\n                    WHERE r.\"roleName\" = 'User';        \n        ");

          case 8:
            role = _context.sent;

            if (role) {
              roledb = role[0];
              roleID = roledb[0].identificador;
              roleName = roledb[0].nombre;
            } else {
              (0, _errors.returnNotFound)(res, 'Role ID');
            }

            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);
            console.log('Error', _context.t0);

          case 15:
            _context.prev = 15;
            _context.next = 18;
            return _User["default"].create({
              email: email,
              pass: cryptoPass,
              nick: nick,
              status: 10,
              roleID: roleID
            }, {
              fields: ['email', 'nick', 'pass', 'isActive', 'status', 'registeredDate', 'roleID'],
              returning: ['userID', 'email', 'nick', 'isActive', 'registeredDate', 'personID', 'collegeID']
            });

          case 18:
            newUser = _context.sent;

            if (!newUser) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'User created successfully',
              user: {
                userID: newUser.userID,
                email: newUser.email,
                pass: 'passw0rd',
                nick: newUser.nick,
                isActive: newUser.isActive,
                registeredDate: newUser.registeredDate
              }
            }));

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](15);
            console.log('Error:', _context.t1);
            (0, _errors.returnError)(res, _context.t1, 'Create Default User');

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 12], [15, 23]]);
  }));
  return _createDefaultUser.apply(this, arguments);
}

function getUsers(_x3, _x4) {
  return _getUsers.apply(this, arguments);
} // Get a user by an ID


function _getUsers() {
  _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, rows, totalRows, total, users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _database.sequelize.query("\n                select \tcount(*)\n                from \"user\"\n                left join \"role\"  on \"user\".\"roleID\" = \"role\".\"roleID\"\n                left join \"person\" on \"user\".\"personID\" = \"person\".\"personID\"\n                left join \"college\" on \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                    where \"user\".\"isActive\" = true;\n        ");

          case 5:
            total = _context2.sent;
            rows = total[0];
            totalRows = parseInt(rows[0].count);
            _context2.next = 10;
            return _database.sequelize.query("\n                    select \t\"user\".\"userID\" identificador,\n                    \"user\".\"nick\" nick,\n                    \"user\".\"email\" correo,\n                    \"user\".\"registeredDate\" alta,\n                    case when \"user\".\"status\" = 0 then 'Demo'\n                        when \"user\".\"status\" = 1 then 'Activo'\n                        when \"user\".\"status\" = 2 then 'Activo con solicitud de pago'\n                        when \"user\".\"status\" = 3 then 'Activo con pago verificado'\n                        when \"user\".\"status\" = 4 then 'Activo con pago retrasado'\n                        when \"user\".\"status\" = 5 then 'Activo con pago retrasado verificado'\n                        when \"user\".\"status\" = 6 then 'Activo sin acceso por pago'\n                        when \"user\".\"status\" = 7 then 'Activo sin acceso por prohibici\xF3n'\n                        when \"user\".\"status\" = 8 then 'Accesso prohibido'\n                        when \"user\".\"status\" = 9 then 'Acceso restringido'\n                        when \"user\".\"status\" = 10 then 'Necesita Verificaci\xF3n ADM'\n                    end status,\n                    \"user\".\"unregisteredDate\" baja,\n                    \"user\".\"lastLogin\" ultimoLogin,\n                    \"user\".\"isActive\",\n                    \"person\".\"completeName\" nombre,\n                    \"role\".\"roleName\" rol,\n                    \"college\".\"collegeShowName\" colegio\n            from \"user\"\n            left join \"role\"  on \"user\".\"roleID\" = \"role\".\"roleID\"\n            left join \"person\" on \"user\".\"personID\" = \"person\".\"personID\"\n            left join \"college\" on \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                where \"user\".\"isActive\" = true\n                order by \"user\".\"userID\"\n                limit ".concat(limit, "\n                offset ").concat(from, ";;\n        "));

          case 10:
            users = _context2.sent;

            if (!users) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              users: users[0],
              count: users[1].rowCount,
              total: totalRows
            }));

          case 15:
            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Any user was founded please contact your administrator',
              error: '0'
            }));

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Users');

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 18]]);
  }));
  return _getUsers.apply(this, arguments);
}

function getUser(_x5, _x6) {
  return _getUser.apply(this, arguments);
} // Update a User


function _getUser() {
  _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userID, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userID = req.params.userID;
            _context3.prev = 1;
            _context3.next = 4;
            return _database.sequelize.query("\n                    select \t\"user\".\"userID\" identificador,\n                    \"user\".\"nick\" nick,\n                    \"user\".\"email\" correo,\n                    \"user\".\"registeredDate\" alta,\n                    case when \"user\".\"status\" = 0 then 'Demo'\n                        when \"user\".\"status\" = 1 then 'Activo'\n                        when \"user\".\"status\" = 2 then 'Activo con solicitud de pago'\n                        when \"user\".\"status\" = 3 then 'Activo con pago verificado'\n                        when \"user\".\"status\" = 4 then 'Activo con pago retrasado'\n                        when \"user\".\"status\" = 5 then 'Activo con pago retrasado verificado'\n                        when \"user\".\"status\" = 6 then 'Activo sin acceso por pago'\n                        when \"user\".\"status\" = 7 then 'Activo sin acceso por prohibici\xF3n'\n                        when \"user\".\"status\" = 8 then 'Accesso prohibido'\n                        when \"user\".\"status\" = 9 then 'Acceso restringido'\n                        when \"user\".\"status\" = 10 then 'Necesita Verificaci\xF3n ADM'\n                    end status,\n                    \"user\".\"unregisteredDate\" baja,\n                    \"user\".\"lastLogin\" ultimoLogin,\n                    \"user\".\"isActive\",\n                    \"person\".\"completeName\" nombre,\n                    \"role\".\"roleName\" rol,\n                    \"college\".\"collegeShowName\" colegio\n                from \"user\"\n                left join \"role\"  on \"user\".\"roleID\" = \"role\".\"roleID\"\n                left join \"person\" on \"user\".\"personID\" = \"person\".\"personID\"\n                left join \"college\" on \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                where \"user\".\"userID\" = ".concat(userID, ";\n        "));

          case 4:
            user = _context3.sent;

            if (!user) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              user: user[0]
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'User ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get User');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getUser.apply(this, arguments);
}

function updateUser(_x7, _x8) {
  return _updateUser.apply(this, arguments);
} // Delete a user by ID


function _updateUser() {
  _updateUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userID, _req$body2, nick, roleID, collegeID, personID, email, status, dbUser, _updateUser2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userID = req.params.userID;
            _req$body2 = req.body, nick = _req$body2.nick, roleID = _req$body2.roleID, collegeID = _req$body2.collegeID, personID = _req$body2.personID, email = _req$body2.email, status = _req$body2.status;
            _context4.prev = 2;
            _context4.next = 5;
            return _User["default"].findOne({
              attributes: ['nick', 'email', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              where: {
                userID: userID
              }
            });

          case 5:
            dbUser = _context4.sent;

            if (!(dbUser === null || dbUser === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'User ID');
            _context4.next = 18;
            break;

          case 10:
            _context4.next = 12;
            return _User["default"].update({
              nick: nick,
              email: email,
              status: status,
              roleID: roleID,
              personID: personID,
              collegeID: collegeID
            }, {
              where: {
                userID: userID
              }
            });

          case 12:
            _updateUser2 = _context4.sent;

            if (!_updateUser2) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'User updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'User ID');

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update User');

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 20]]);
  }));
  return _updateUser.apply(this, arguments);
}

function deleteUser(_x9, _x10) {
  return _deleteUser.apply(this, arguments);
} // Change activate or inactivate a college


function _deleteUser() {
  _deleteUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var userID, countDeleted;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userID = req.params.userID;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].destroy({
              where: {
                userID: userID
              }
            });

          case 4:
            countDeleted = _context5.sent;

            if (!(countDeleted > 0)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'User deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'User ID');

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Delete User');

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _deleteUser.apply(this, arguments);
}

function changeActivationUser(_x11, _x12) {
  return _changeActivationUser.apply(this, arguments);
} // Create an user from administration mode


function _changeActivationUser() {
  _changeActivationUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var userID, type, value, action, afirmation, negation, changeActivationJSON, dbUser, changeActivation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userID = req.params.userID;
            type = req.query.type;
            action = '';
            afirmation = '';
            negation = '';

            if (!(type.toLowerCase() === 'activate')) {
              _context6.next = 13;
              break;
            }

            value = true;
            action = 'Activating';
            afirmation = 'active';
            negation = 'inactive';
            changeActivationJSON = {
              isActive: value,
              unregisteredDate: null
            };
            _context6.next = 22;
            break;

          case 13:
            if (!(type.toLowerCase() === 'inactivate')) {
              _context6.next = 21;
              break;
            }

            value = false;
            action = 'Inactivating';
            afirmation = 'inactive';
            negation = 'active';
            changeActivationJSON = {
              isActive: value,
              unregisteredDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
            };
            _context6.next = 22;
            break;

          case 21:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Wrong type for the request'
            }));

          case 22:
            _context6.prev = 22;
            _context6.next = 25;
            return _User["default"].findOne({
              attributes: ['userID', 'nick', 'email', 'isActive', 'unregisteredDate', 'registeredDate', 'status'],
              where: {
                userID: userID
              }
            });

          case 25:
            dbUser = _context6.sent;

            if (!dbUser) {
              _context6.next = 37;
              break;
            }

            _context6.next = 29;
            return _User["default"].update(changeActivationJSON, {
              where: {
                userID: userID,
                isActive: !value
              }
            });

          case 29:
            changeActivation = _context6.sent;

            if (!(changeActivation > 0)) {
              _context6.next = 34;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'User ' + type.toLowerCase() + 'd successfully'
            }));

          case 34:
            return _context6.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error while ' + action + ' a User or User already ' + afirmation,
              error: 'Error 0'
            }));

          case 35:
            _context6.next = 38;
            break;

          case 37:
            (0, _errors.returnNotFound)(res, negation + ' User');

          case 38:
            _context6.next = 44;
            break;

          case 40:
            _context6.prev = 40;
            _context6.t0 = _context6["catch"](22);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Activating/Inactivating User');

          case 44:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[22, 40]]);
  }));
  return _changeActivationUser.apply(this, arguments);
}

function createUser(_x13, _x14) {
  return _createUser.apply(this, arguments);
} // Get users from college with pagination


function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body3, email, pass, nick, personID, collegeID, roleID, salt, cryptoPass, newUser;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, pass = _req$body3.pass, nick = _req$body3.nick, personID = _req$body3.personID, collegeID = _req$body3.collegeID, roleID = _req$body3.roleID;
            salt = bcrypt.genSaltSync();
            cryptoPass = bcrypt.hashSync(pass, salt);
            _context7.prev = 3;
            _context7.next = 6;
            return _User["default"].create({
              email: email,
              nick: nick,
              pass: cryptoPass,
              status: 1,
              personID: personID,
              collegeID: collegeID,
              roleID: roleID
            }, {
              fields: ['email', 'nick', 'pass', 'isActive', 'status', 'registeredDate', 'roleID', 'collegeID', 'personID'],
              returning: ['userID', 'email', 'nick', 'isActive', 'status', 'registeredDate', 'personID', 'collegeID', 'roleID']
            });

          case 6:
            newUser = _context7.sent;

            if (!newUser) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'User created successfully',
              user: {
                userID: newUser.userID,
                email: newUser.email,
                pass: 'passw0rd',
                nick: newUser.nick,
                isActive: newUser.isActive,
                status: newUser.status,
                registeredDate: newUser.registeredDate,
                roleID: newUser.roleID,
                personID: newUser.personID,
                collegeID: newUser.collegeID
              }
            }));

          case 9:
            _context7.next = 15;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](3);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Create User from Admin');

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 11]]);
  }));
  return _createUser.apply(this, arguments);
}

function getCollegeUser(_x15, _x16) {
  return _getCollegeUser.apply(this, arguments);
}

function _getCollegeUser() {
  _getCollegeUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var collegeID, limit, from, rows, totalRows, total, users;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            collegeID = req.params.collegeID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context8.prev = 3;
            _context8.next = 6;
            return _database.sequelize.query("\n                select count (*)\n                from \"user\"\n                left join \"role\"  on \"user\".\"roleID\" = \"role\".\"roleID\"\n                left join \"person\" on \"user\".\"personID\" = \"person\".\"personID\"\n                left join \"college\" on \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                    where \"user\".\"collegeID\" = 5\n                    and \"user\".\"isActive\" = true;\n        ");

          case 6:
            total = _context8.sent;
            rows = total[0];
            totalRows = parseInt(rows[0].count);
            _context8.next = 11;
            return _database.sequelize.query("\n                            select \t\"user\".\"userID\" identificador,\n                            \"user\".\"nick\" nick,\n                            \"user\".\"email\" correo,\n                            \"user\".\"registeredDate\" alta,\n                            case when \"user\".\"status\" = 0 then 'Demo'\n                                when \"user\".\"status\" = 1 then 'Activo'\n                                when \"user\".\"status\" = 2 then 'Activo con solicitud de pago'\n                                when \"user\".\"status\" = 3 then 'Activo con pago verificado'\n                                when \"user\".\"status\" = 4 then 'Activo con pago retrasado'\n                                when \"user\".\"status\" = 5 then 'Activo con pago retrasado verificado'\n                                when \"user\".\"status\" = 6 then 'Activo sin acceso por pago'\n                                when \"user\".\"status\" = 7 then 'Activo sin acceso por prohibici\xF3n'\n                                when \"user\".\"status\" = 8 then 'Accesso prohibido'\n                                when \"user\".\"status\" = 9 then 'Acceso restringido'\n                                when \"user\".\"status\" = 10 then 'Necesita Verificaci\xF3n ADM'\n                            end status,\n                            \"user\".\"unregisteredDate\" baja,\n                            \"user\".\"lastLogin\" ultimoLogin,\n                            \"user\".\"isActive\",\n                            \"person\".\"completeName\" nombre,\n                            \"role\".\"roleName\" rol,\n                            \"college\".\"collegeShowName\" colegio\n                        from \"user\"\n                        left join \"role\"  on \"user\".\"roleID\" = \"role\".\"roleID\"\n                        left join \"person\" on \"user\".\"personID\" = \"person\".\"personID\"\n                        left join \"college\" on \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                        where \"user\".\"collegeID\" = ".concat(collegeID, "\n                              and \"user\".\"isActive\" = true\n                        order by \"user\".\"userID\"\n                        limit ").concat(limit, "\n                        offset ").concat(from, ";\n        "));

          case 11:
            users = _context8.sent;

            if (!users) {
              _context8.next = 16;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              users: users[0],
              count: users[1].rowCount,
              total: totalRows
            }));

          case 16:
            (0, _errors.returnNotFound)(res, 'College ID');

          case 17:
            _context8.next = 23;
            break;

          case 19:
            _context8.prev = 19;
            _context8.t0 = _context8["catch"](3);
            console.log('Error:', _context8.t0);
            return _context8.abrupt("return", res.status(500).json({
              e: _context8.t0
            }));

          case 23:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[3, 19]]);
  }));
  return _getCollegeUser.apply(this, arguments);
}