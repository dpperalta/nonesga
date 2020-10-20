"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSubject = createSubject;
exports.getSubjects = getSubjects;
exports.getSubject = getSubject;
exports.updateSubject = updateSubject;
exports.changeActivationSubject = changeActivationSubject;
exports.deleteSubject = deleteSubject;

var _Subject = _interopRequireDefault(require("../models/Subject"));

var _Course = _interopRequireDefault(require("../models/Course"));

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _database = require("../database/database");

var _errors = require("./errors");

var _Person = _interopRequireDefault(require("../models/Person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Create a new Subject
function createSubject(_x, _x2) {
  return _createSubject.apply(this, arguments);
} // Get all subjects


function _createSubject() {
  _createSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, subjectCode, subjectName, description, details, gradeNeeded, gradeHomologation, gradeMinimun, gradeMaximun, teacherID, courseID, newSubject;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, subjectCode = _req$body.subjectCode, subjectName = _req$body.subjectName, description = _req$body.description, details = _req$body.details, gradeNeeded = _req$body.gradeNeeded, gradeHomologation = _req$body.gradeHomologation, gradeMinimun = _req$body.gradeMinimun, gradeMaximun = _req$body.gradeMaximun, teacherID = _req$body.teacherID, courseID = _req$body.courseID;
            _context.prev = 1;
            _context.next = 4;
            return _Subject["default"].create({
              subjectCode: subjectCode,
              subjectName: subjectName,
              description: description,
              details: details,
              gradeNeeded: gradeNeeded,
              gradeHomologation: gradeHomologation,
              gradeMinimun: gradeMinimun,
              gradeMaximun: gradeMaximun,
              teacherID: teacherID,
              courseID: courseID
            }, {
              fields: ['subjectCode', 'subjectName', 'description', 'details', 'gradeNeeded', 'gradeHomologation', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
              returning: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'gradeNeeded', 'gradeHomologation', 'gradeMinimun', 'gradeMaximun', 'isActive', 'registeredDate', 'teacherID', 'courseID']
            });

          case 4:
            newSubject = _context.sent;

            if (!newSubject) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Subject created successfully',
              subject: newSubject
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Subject');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createSubject.apply(this, arguments);
}

function getSubjects(_x3, _x4) {
  return _getSubjects.apply(this, arguments);
} // Get information about one subject


function _getSubjects() {
  _getSubjects = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, subjects;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Subject["default"].findAndCountAll({
              attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
              order: [['subjectName', 'ASC']],
              include: [{
                model: _Teacher["default"],
                attributes: ['teacherID', 'personID'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Course["default"],
                attributes: ['courseID', 'courseName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            subjects = _context2.sent;

            if (!subjects) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              subjects: subjects
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Subject');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Subjects');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getSubjects.apply(this, arguments);
}

function getSubject(_x5, _x6) {
  return _getSubject.apply(this, arguments);
} // Update a subject


function _getSubject() {
  _getSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var subjectID, subject;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subjectID = req.params.subjectID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Subject["default"].findOne({
              attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
              where: {
                subjectID: subjectID
              },
              include: [{
                model: _Teacher["default"],
                attributes: ['teacherID', 'personID'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Course["default"],
                attributes: ['courseID', 'courseName']
              }]
            });

          case 4:
            subject = _context3.sent;

            if (!subject) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              subject: subject
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Subject');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getSubject.apply(this, arguments);
}

function updateSubject(_x7, _x8) {
  return _updateSubject.apply(this, arguments);
} // Change activation status to a subject


function _updateSubject() {
  _updateSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var subjectID, _req$body2, subjectCode, subjectName, description, details, gradeNeeded, gradeHomologation, gradeMinimun, gradeMaximun, teacherID, courseID, dbSubject, updatedSubject;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            subjectID = req.params.subjectID;
            _req$body2 = req.body, subjectCode = _req$body2.subjectCode, subjectName = _req$body2.subjectName, description = _req$body2.description, details = _req$body2.details, gradeNeeded = _req$body2.gradeNeeded, gradeHomologation = _req$body2.gradeHomologation, gradeMinimun = _req$body2.gradeMinimun, gradeMaximun = _req$body2.gradeMaximun, teacherID = _req$body2.teacherID, courseID = _req$body2.courseID;
            _context4.prev = 2;
            _context4.next = 5;
            return _Subject["default"].findOne({
              attributes: ['subjectID', 'subjectCode', 'subjectName', 'description', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'gradeNeeded', 'gradeMinimun', 'gradeMaximun', 'teacherID', 'courseID'],
              where: {
                subjectID: subjectID
              }
            });

          case 5:
            dbSubject = _context4.sent;

            if (!(dbSubject === null || dbSubject === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Subject ID');
            _context4.next = 18;
            break;

          case 10:
            _context4.next = 12;
            return _Subject["default"].update({
              subjectCode: subjectCode,
              subjectName: subjectName,
              description: description,
              details: details,
              gradeNeeded: gradeNeeded,
              gradeHomologation: gradeHomologation,
              gradeMinimun: gradeMinimun,
              gradeMaximun: gradeMaximun,
              teacherID: teacherID,
              courseID: courseID
            }, {
              where: {
                subjectID: subjectID
              }
            });

          case 12:
            updatedSubject = _context4.sent;

            if (!updatedSubject) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Subject Updatede Successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update Subject');

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 20]]);
  }));
  return _updateSubject.apply(this, arguments);
}

function changeActivationSubject(_x9, _x10) {
  return _changeActivationSubject.apply(this, arguments);
}

function _changeActivationSubject() {
  _changeActivationSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var subjectID, type, value, action, afirmation, negation, changeActivationJSON, dbSubject, changeActivation;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            subjectID = req.params.subjectID;
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
            return _Subject["default"].findOne({
              attributes: ['subjectID', 'subjectCode', 'subjectName', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                subjectID: subjectID
              }
            });

          case 9:
            dbSubject = _context5.sent;

            if (!dbSubject) {
              _context5.next = 21;
              break;
            }

            _context5.next = 13;
            return _Subject["default"].update(changeActivationJSON, {
              where: {
                subjectID: subjectID,
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
              message: 'Subject ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Subject or Subject already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context5.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Change Activation Subject');

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 24]]);
  }));
  return _changeActivationSubject.apply(this, arguments);
}

function deleteSubject(_x11, _x12) {
  return _deleteSubject.apply(this, arguments);
} // Get subject by college
// Get subject by course
// Get subject by teacher
// Get subject by student


function _deleteSubject() {
  _deleteSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var subjectID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            subjectID = req.params.subjectID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Subject["default"].destroy({
              where: {
                subjectID: subjectID
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
              message: 'Subject deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Subject');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteSubject.apply(this, arguments);
}