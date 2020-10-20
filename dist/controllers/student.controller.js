"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStudent = createStudent;
exports.getStudents = getStudents;
exports.updateStudent = updateStudent;
exports.changeActivationStudent = changeActivationStudent;
exports.getStuddent = getStuddent;
exports.deleteStudent = deleteStudent;
exports.getStudentByCollege = getStudentByCollege;

var _Student = _interopRequireDefault(require("../models/Student"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Student
function createStudent(_x, _x2) {
  return _createStudent.apply(this, arguments);
}

function _createStudent() {
  _createStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, studentCode, status, previousCourse, actualCourse, grade, details, ratting, bio, personID, newStudent;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, studentCode = _req$body.studentCode, status = _req$body.status, previousCourse = _req$body.previousCourse, actualCourse = _req$body.actualCourse, grade = _req$body.grade, details = _req$body.details, ratting = _req$body.ratting, bio = _req$body.bio, personID = _req$body.personID;
            _context.prev = 1;
            _context.next = 4;
            return _Student["default"].create({
              studentCode: studentCode,
              status: status,
              previousCourse: previousCourse,
              actualCourse: actualCourse,
              grade: grade,
              details: details,
              ratting: ratting,
              bio: bio,
              personID: personID
            }, {
              fields: ['studentCode', 'status', 'previousCourse', 'actualCourse', 'grade', 'details', 'ratting', 'bio', 'personID'],
              returning: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'previousCourse', 'actualCourse', 'grade', 'details', 'ratting', 'bio', 'personID']
            });

          case 4:
            newStudent = _context.sent;

            if (!newStudent) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Student created successfully',
              student: newStudent
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Student');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createStudent.apply(this, arguments);
}

function getStudents(_x3, _x4) {
  return _getStudents.apply(this, arguments);
} // Update a student


function _getStudents() {
  _getStudents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, students;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Student["default"].findAndCountAll({
              attributes: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'bio', 'details', 'personID', 'ratting', 'grade', 'actualCourse', 'previousCourse'],
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            students = _context2.sent;

            if (!(students.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              students: students
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Student');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Studdents');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getStudents.apply(this, arguments);
}

function updateStudent(_x5, _x6) {
  return _updateStudent.apply(this, arguments);
} // Change to active or inactive an student


function _updateStudent() {
  _updateStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var studentID, _req$body2, studentCode, status, previousCourse, actualCourse, grade, details, ratting, bio, personID, dbStudent, updatedStudent;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            studentID = req.params.studentID;
            _req$body2 = req.body, studentCode = _req$body2.studentCode, status = _req$body2.status, previousCourse = _req$body2.previousCourse, actualCourse = _req$body2.actualCourse, grade = _req$body2.grade, details = _req$body2.details, ratting = _req$body2.ratting, bio = _req$body2.bio, personID = _req$body2.personID;
            _context3.prev = 2;
            _context3.next = 5;
            return _Student["default"].findOne({
              attributes: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'previousCourse', 'actualCourse', 'grade', 'bio', 'details', 'ratting', 'personID'],
              where: {
                studentID: studentID
              }
            });

          case 5:
            dbStudent = _context3.sent;

            if (!(dbStudent === null || dbStudent === undefined)) {
              _context3.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Student ID');
            _context3.next = 18;
            break;

          case 10:
            _context3.next = 12;
            return _Student["default"].update({
              studentCode: studentCode,
              status: status,
              previousCourse: previousCourse,
              actualCourse: actualCourse,
              grade: grade,
              details: details,
              ratting: ratting,
              bio: bio,
              personID: personID
            }, {
              where: {
                studentID: studentID
              }
            });

          case 12:
            updatedStudent = _context3.sent;

            if (!updatedStudent) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Student updated successfully'
            }));

          case 17:
            (0, _errors.returnWrongError)(res, 'Student', 'for Update');

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](2);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Update Student');

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 20]]);
  }));
  return _updateStudent.apply(this, arguments);
}

function changeActivationStudent(_x7, _x8) {
  return _changeActivationStudent.apply(this, arguments);
} // Get the information of an Student


function _changeActivationStudent() {
  _changeActivationStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var studentID, type, value, action, afirmation, negation, changeActivationJSON, dbStudent, changeActivation;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            studentID = req.params.studentID;
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
            return _Student["default"].findOne({
              attributes: ['studentID', 'studentCode', 'isActive', 'status', 'personID'],
              where: {
                studentID: studentID
              }
            });

          case 9:
            dbStudent = _context4.sent;

            if (!dbStudent) {
              _context4.next = 21;
              break;
            }

            _context4.next = 13;
            return _Student["default"].update(changeActivationJSON, {
              where: {
                studentID: studentID,
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
              message: 'Student ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Student or Student already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context4.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Student ID');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](6);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Change Activation Student');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 24]]);
  }));
  return _changeActivationStudent.apply(this, arguments);
}

function getStuddent(_x9, _x10) {
  return _getStuddent.apply(this, arguments);
} // Delete a student


function _getStuddent() {
  _getStuddent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var studentID, student;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            studentID = req.params.studentID;
            _context5.prev = 1;
            _context5.next = 4;
            return _Student["default"].findOne({
              attributes: ['studentID', 'studentCode', 'status', 'isActive', 'registeredDate', 'unregisteredDate', 'details', 'bio', 'ratting', 'grade', 'previousCourse', 'actualCourse', 'personID'],
              where: {
                studentID: studentID
              },
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }]
            });

          case 4:
            student = _context5.sent;

            if (!student) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              student: student
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Student ID');

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get an Student');

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _getStuddent.apply(this, arguments);
}

function deleteStudent(_x11, _x12) {
  return _deleteStudent.apply(this, arguments);
} // Get teacher by college


function _deleteStudent() {
  _deleteStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var studentID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            studentID = req.params.studentID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Student["default"].destroy({
              where: {
                studentID: studentID
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
              message: 'Student deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Student');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Student');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteStudent.apply(this, arguments);
}

function getStudentByCollege(_x13, _x14) {
  return _getStudentByCollege.apply(this, arguments);
}

function _getStudentByCollege() {
  _getStudentByCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var collegeID, limit, from, total, students;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            collegeID = req.params.collegeID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context7.prev = 3;
            _context7.next = 6;
            return _database.sequelize.query("\n            SELECT \t\"person\".\"personID\" persona,\n                    \"user\".\"userID\" usuario,\n                    \"college\".\"collegeID\" colegio,\n                    \"student\".\"studentID\" estudiante,\n                    \"person\".\"names\" nombres,\n                    \"person\".\"lastNames\" apellidos,\n                    \"person\".\"completeName\" completo,\n                    \"person\".\"dni\" cedula,\n                    \"college\".\"collegeName\" colegio,\n                    \"user\".\"email\"\n            FROM \"student\", \"college\", \"person\", \"user\"\n            WHERE \"student\".\"personID\" = \"person\".\"personID\"\n                AND \"user\".\"personID\" = \"person\".\"personID\"\n                AND \"user\".\"collegeID\" = \"college\".\"collegeID\"\n                AND \"college\".\"collegeID\" = ".concat(collegeID, "\n                ORDER BY \"person\".\"lastNames\"\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, ";\n        "));

          case 6:
            students = _context7.sent;
            total = parseInt(students[1].rowCount);

            if (!(total > 0)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              students: students[0],
              total: total
            }));

          case 12:
            (0, _errors.returnNotFound)(res, 'Any Student for this College');

          case 13:
            _context7.next = 19;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](3);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, "Get Student by College");

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 15]]);
  }));
  return _getStudentByCollege.apply(this, arguments);
}