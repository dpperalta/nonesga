"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTeacher = createTeacher;
exports.getTeachers = getTeachers;
exports.updateTeacher = updateTeacher;
exports.changeActivationTeacher = changeActivationTeacher;
exports.getTeacher = getTeacher;
exports.deleteTeacher = deleteTeacher;
exports.getTeacherByCollege = getTeacherByCollege;

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Teacher
function createTeacher(_x, _x2) {
  return _createTeacher.apply(this, arguments);
} // Get all teachers with person 


function _createTeacher() {
  _createTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, teacherCode, status, details, bio, personID, newTeacher;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, teacherCode = _req$body.teacherCode, status = _req$body.status, details = _req$body.details, bio = _req$body.bio, personID = _req$body.personID;
            _context.prev = 1;
            _context.next = 4;
            return _Teacher["default"].create({
              teacherCode: teacherCode,
              status: status,
              details: details,
              bio: bio,
              personID: personID
            }, {
              fields: ['teacherCode', 'status', 'details', 'bio', 'personID'],
              returning: ['teacherID', 'teacherCode', 'status', 'isActive', 'registeredDate', 'details', 'bio', 'personID']
            });

          case 4:
            newTeacher = _context.sent;

            if (!newTeacher) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Teacher created successfully',
              teacher: newTeacher
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Teacher');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createTeacher.apply(this, arguments);
}

function getTeachers(_x3, _x4) {
  return _getTeachers.apply(this, arguments);
} // Update a teacher


function _getTeachers() {
  _getTeachers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, teachers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Teacher["default"].findAndCountAll({
              attributes: ['teacherID', 'teacherCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'details', 'bio', 'ratting', 'personID'],
              where: {
                isActive: true
              },
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            teachers = _context2.sent;

            if (!(teachers.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              teachers: teachers
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Teacher');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Teachers');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getTeachers.apply(this, arguments);
}

function updateTeacher(_x5, _x6) {
  return _updateTeacher.apply(this, arguments);
} // Change to active or inactive to a teacher


function _updateTeacher() {
  _updateTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var teacherID, _req$body2, teacherCode, status, details, bio, ratting, personID, dbTeacher, updatedTeacher;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            teacherID = req.params.teacherID;
            _req$body2 = req.body, teacherCode = _req$body2.teacherCode, status = _req$body2.status, details = _req$body2.details, bio = _req$body2.bio, ratting = _req$body2.ratting, personID = _req$body2.personID;
            _context3.prev = 2;
            _context3.next = 5;
            return _Teacher["default"].findOne({
              attributes: ['teacherID', 'teacherCode', 'status', 'isActive', 'details', 'bio', 'ratting', 'personID'],
              where: {
                teacherID: teacherID
              }
            });

          case 5:
            dbTeacher = _context3.sent;

            if (!(dbTeacher === null || dbTeacher === undefined)) {
              _context3.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Teacher ID');
            _context3.next = 18;
            break;

          case 10:
            _context3.next = 12;
            return _Teacher["default"].update({
              teacherCode: teacherCode,
              status: status,
              details: details,
              bio: bio,
              ratting: ratting,
              personID: personID
            }, {
              where: {
                teacherID: teacherID
              }
            });

          case 12:
            updatedTeacher = _context3.sent;

            if (!updateTeacher) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Teacher updated successfully'
            }));

          case 17:
            (0, _errors.returnWrongError)(res, 'Teahcer', 'for Update');

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](2);
            console.log('Error:', error);
            (0, _errors.returnError)(res, _context3.t0, 'Update Teacher');

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 20]]);
  }));
  return _updateTeacher.apply(this, arguments);
}

function changeActivationTeacher(_x7, _x8) {
  return _changeActivationTeacher.apply(this, arguments);
} // Get a teacher


function _changeActivationTeacher() {
  _changeActivationTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var teacherID, type, value, action, afirmation, negation, changeActivationJSON, dbTeacher, changeActivation;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            teacherID = req.params.teacherID;
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

            _context4.prev = 6;
            _context4.next = 9;
            return _Teacher["default"].findOne({
              attributes: ['teacherID', 'teacherCode', 'isActive', 'status', 'personID'],
              where: {
                teacherID: teacherID
              }
            });

          case 9:
            dbTeacher = _context4.sent;

            if (!dbTeacher) {
              _context4.next = 21;
              break;
            }

            _context4.next = 13;
            return _Teacher["default"].update(changeActivationJSON, {
              where: {
                teacherID: teacherID,
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
              message: 'Teacher ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Teacher or Teacher already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context4.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Teacher ID');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](6);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Change Activation Teacher');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 24]]);
  }));
  return _changeActivationTeacher.apply(this, arguments);
}

function getTeacher(_x9, _x10) {
  return _getTeacher.apply(this, arguments);
} // Delete a teacher


function _getTeacher() {
  _getTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var teacherID, teacher;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            teacherID = req.params.teacherID;
            _context5.prev = 1;
            _context5.next = 4;
            return _Teacher["default"].findOne({
              attributes: ['teacherID', 'teacherCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'details', 'bio', 'ratting', 'personID'],
              where: {
                teacherID: teacherID
              },
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }]
            });

          case 4:
            teacher = _context5.sent;

            if (!teacher) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              teacher: teacher
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Teacher ID');

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _getTeacher.apply(this, arguments);
}

function deleteTeacher(_x11, _x12) {
  return _deleteTeacher.apply(this, arguments);
} // Get teacher by college


function _deleteTeacher() {
  _deleteTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var teacherID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            teacherID = req.params.teacherID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Teacher["default"].destroy({
              where: {
                teacherID: teacherID
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
              message: 'Teacher deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Teacher');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Teacher');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteTeacher.apply(this, arguments);
}

function getTeacherByCollege(_x13, _x14) {
  return _getTeacherByCollege.apply(this, arguments);
}

function _getTeacherByCollege() {
  _getTeacherByCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var collegeID, limit, from, total, teachers;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            collegeID = req.params.collegeID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context7.prev = 3;
            _context7.next = 6;
            return _database.sequelize.query("\n            select \t\"person\".\"personID\" persona,\n                    \"user\".\"userID\" usuario,\n                    \"college\".\"collegeID\" colegio,\n                    \"teacher\".\"teacherID\" profesor,\n                    \"person\".\"names\" nombres,\n                    \"person\".\"lastNames\" apellidos,\n                    \"person\".\"completeName\" completo,\n                    \"person\".\"dni\" cedula,\n                    \"college\".\"collegeName\" colegio,\n                    \"user\".\"email\"\n            from \"teacher\", \"college\", \"person\", \"user\"\n            where \"teacher\".\"personID\" = \"person\".\"personID\"\n                and \"user\".\"personID\" = \"person\".\"personID\"\n                and \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                and \"college\".\"collegeID\" = ".concat(collegeID, "\n                order by \"person\".\"lastNames\"\n                limit ").concat(limit, "\n                offset ").concat(from, ";\n        "));

          case 6:
            teachers = _context7.sent;
            total = parseInt(teachers[1].rowCount);

            if (!(total > 0)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              teachers: teachers[0],
              total: total
            }));

          case 12:
            (0, _errors.returnNotFound)(res, 'Any Teacher for this College');

          case 13:
            _context7.next = 19;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](3);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, "Get Teacher by College");

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 15]]);
  }));
  return _getTeacherByCollege.apply(this, arguments);
}