"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExamGrade = createExamGrade;
exports.getExamGrades = getExamGrades;
exports.getExamGradeByID = getExamGradeByID;
exports.getExamGradesByStudent = getExamGradesByStudent;
exports.getExamGradesByStudentAndExam = getExamGradesByStudentAndExam;
exports.getExamGradesByTeacher = getExamGradesByTeacher;
exports.getExamGradesByTeacherAndExam = getExamGradesByTeacherAndExam;
exports.updateExamGrade = updateExamGrade;
exports.deleteExamGrade = deleteExamGrade;

var _ExamGrade = _interopRequireDefault(require("../models/ExamGrade"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _Exam = _interopRequireDefault(require("../models/Exam"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create new Exam Grade
function createExamGrade(_x, _x2) {
  return _createExamGrade.apply(this, arguments);
} // Get all Exam Grades


function _createExamGrade() {
  _createExamGrade = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, gradeDetail, studentID, examID, teacherID, sumOfGrades, responseGrades, totalGrade, newExamGrade;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, gradeDetail = _req$body.gradeDetail, studentID = _req$body.studentID, examID = _req$body.examID, teacherID = _req$body.teacherID;
            _context.prev = 1;
            _context.next = 4;
            return _database.sequelize.query("\n            SELECT  SUM(CASE WHEN sa.\"grade\" IS null THEN 0 ELSE sa.\"grade\" end) grade\n            FROM    \"studentAnswer\" sa, \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex\n                WHERE   sa.\"answerID\" = ea.\"answerID\"\n                    AND ea.\"questionID\" = eq.\"questionID\"\n                    AND eq.\"examID\" = ex.\"examID\"\n                    AND ex.\"examID\" = ".concat(examID, "\n                    AND sa.\"studentID\" = ").concat(studentID, "\n                    AND sa.\"isPublished\" = true\n                    AND sa.\"isActive\" = true\n                    AND eq.\"isActive\" = true\n                    AND ex.\"isActive\" = true;\n        "));

          case 4:
            sumOfGrades = _context.sent;
            responseGrades = sumOfGrades[0];
            totalGrade = responseGrades[0].grade;

            if (!(totalGrade === undefined || totalGrade === null)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'There is no exam to grade for the Student'
            }));

          case 9:
            if (!(totalGrade === undefined || totalGrade === null)) {
              _context.next = 13;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam or Student ID');
            _context.next = 18;
            break;

          case 13:
            _context.next = 15;
            return _ExamGrade["default"].create({
              grade: totalGrade,
              homologatedGrade: examGradeHomologation(totalGrade),
              gradeDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              gradeDetail: gradeDetail,
              isGraded: true,
              studentID: studentID,
              examID: examID,
              teacherID: teacherID
            }, {
              fields: ['grade', 'homologatedGrade', 'gradeDate', 'gradeDetail', 'isGraded', 'studentID', 'examID', 'teacherID'],
              returning: ['examGradeID', 'grade', 'homologatedGrade', 'gradeDate', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID']
            });

          case 15:
            newExamGrade = _context.sent;

            if (!newExamGrade) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Graded successfully',
              examGrade: newExamGrade
            }));

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Exam Grade');

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 20]]);
  }));
  return _createExamGrade.apply(this, arguments);
}

function getExamGrades(_x3, _x4) {
  return _getExamGrades.apply(this, arguments);
} // Get an Exam Grade by ID


function _getExamGrades() {
  _getExamGrades = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, examGrades;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _ExamGrade["default"].findAndCountAll({
              attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }, {
                model: _Teacher["default"],
                attributes: ['teacherID', 'teacherCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }],
              limit: limit,
              offset: from
            });

          case 5:
            examGrades = _context2.sent;

            if (!(examGrades.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              examGrades: examGrades
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Exam Grades');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Exam Grades');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getExamGrades.apply(this, arguments);
}

function getExamGradeByID(_x5, _x6) {
  return _getExamGradeByID.apply(this, arguments);
} // Get all Exam Grades by Student


function _getExamGradeByID() {
  _getExamGradeByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var examGradeID, examGrade;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            examGradeID = req.params.examGradeID;
            _context3.prev = 1;
            _context3.next = 4;
            return _ExamGrade["default"].findOne({
              attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
              where: {
                examGradeID: examGradeID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }, {
                model: _Teacher["default"],
                attributes: ['teacherID', 'teacherCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }]
            });

          case 4:
            examGrade = _context3.sent;

            if (!examGrade) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              examGrade: examGrade
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Grade ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Exam Grade by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getExamGradeByID.apply(this, arguments);
}

function getExamGradesByStudent(_x7, _x8) {
  return _getExamGradesByStudent.apply(this, arguments);
} // Get all Exan Grades fron an Exam of an Student


function _getExamGradesByStudent() {
  _getExamGradesByStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var studentID, limit, from, examGrades;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            studentID = req.params.studentID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _ExamGrade["default"].findAndCountAll({
              attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
              where: {
                studentID: studentID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }, {
                model: _Teacher["default"],
                attributes: ['teacherID', 'teacherCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examGrades = _context4.sent;

            if (!(examGrades.count > 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              examGrades: examGrades
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Student ID');

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Exam Grades by Student');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getExamGradesByStudent.apply(this, arguments);
}

function getExamGradesByStudentAndExam(_x9, _x10) {
  return _getExamGradesByStudentAndExam.apply(this, arguments);
} // Get exam grades of a teacher


function _getExamGradesByStudentAndExam() {
  _getExamGradesByStudentAndExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$params, studentID, examID, limit, from, examGrades;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, studentID = _req$params.studentID, examID = _req$params.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context5.prev = 3;
            _context5.next = 6;
            return _ExamGrade["default"].findAndCountAll({
              attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
              where: {
                studentID: studentID,
                examID: examID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }, {
                model: _Teacher["default"],
                attributes: ['teacherID', 'teacherCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examGrades = _context5.sent;

            if (!(examGrades.count > 0)) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              examGrades: examGrades
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Student or Exam ID');

          case 12:
            _context5.next = 18;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](3);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get all Exam Grades for Student and Exam');

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return _getExamGradesByStudentAndExam.apply(this, arguments);
}

function getExamGradesByTeacher(_x11, _x12) {
  return _getExamGradesByTeacher.apply(this, arguments);
} // Get exam grades of a teacher


function _getExamGradesByTeacher() {
  _getExamGradesByTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var teacherID, limit, from, examGrades;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            teacherID = req.params.teacherID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context6.prev = 3;
            _context6.next = 6;
            return _ExamGrade["default"].findAndCountAll({
              attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
              where: {
                teacherID: teacherID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }, {
                model: _Teacher["default"],
                attributes: ['teacherID', 'teacherCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examGrades = _context6.sent;

            if (!(examGrades.count > 0)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              examGrades: examGrades
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Teacher ID');

          case 12:
            _context6.next = 18;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](3);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Exam Grades by Teacher');

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 14]]);
  }));
  return _getExamGradesByTeacher.apply(this, arguments);
}

function getExamGradesByTeacherAndExam(_x13, _x14) {
  return _getExamGradesByTeacherAndExam.apply(this, arguments);
} // Update an Exam Grade


function _getExamGradesByTeacherAndExam() {
  _getExamGradesByTeacherAndExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$params2, teacherID, examID, limit, from, examGrades;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$params2 = req.params, teacherID = _req$params2.teacherID, examID = _req$params2.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context7.prev = 3;
            _context7.next = 6;
            return _ExamGrade["default"].findAndCountAll({
              attributes: ['examGradeID', 'grade', 'gradeDate', 'homologatedGrade', 'gradeDetail', 'isGraded', 'isModified', 'modificationDate', 'modificationUser', 'previousGrade', 'studentID', 'examID', 'teacherID'],
              where: {
                teacherID: teacherID,
                examID: examID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }, {
                model: _Teacher["default"],
                attributes: ['teacherID', 'teacherCode'],
                include: {
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examGrades = _context7.sent;

            if (!(examGrades.count > 0)) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              examGrades: examGrades
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Teacher or Exam ID');

          case 12:
            _context7.next = 18;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](3);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Get Exam Grades by Teacher and Exam');

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 14]]);
  }));
  return _getExamGradesByTeacherAndExam.apply(this, arguments);
}

function updateExamGrade(_x15, _x16) {
  return _updateExamGrade.apply(this, arguments);
} // Delete an Exam Grade


function _updateExamGrade() {
  _updateExamGrade = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var examGradeID, _req$body2, grade, gradeDetail, modificationUser, studentID, examID, teacherID, dbExamGrade, previousGrade, updatedGrade;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            examGradeID = req.params.examGradeID;
            _req$body2 = req.body, grade = _req$body2.grade, gradeDetail = _req$body2.gradeDetail, modificationUser = _req$body2.modificationUser, studentID = _req$body2.studentID, examID = _req$body2.examID, teacherID = _req$body2.teacherID;

            if (!(gradeDetail === undefined || modificationUser === undefined)) {
              _context8.next = 4;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Missing required parameters, detail or user'
            }));

          case 4:
            _context8.prev = 4;
            _context8.next = 7;
            return _ExamGrade["default"].findOne({
              attributes: ['examGradeID', 'grade', 'homologatedGrade', 'gradeDate', 'teacherID'],
              where: {
                examGradeID: examGradeID
              }
            });

          case 7:
            dbExamGrade = _context8.sent;
            previousGrade = dbExamGrade.dataValues.grade;

            if (!(dbExamGrade === null || dbExamGrade === undefined)) {
              _context8.next = 13;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam Grade ID');
            _context8.next = 21;
            break;

          case 13:
            _context8.next = 15;
            return _ExamGrade["default"].update({
              grade: grade,
              homologatedGrade: examGradeHomologation(grade),
              gradeDetail: gradeDetail,
              studentID: studentID,
              examID: examID,
              teacherID: teacherID,
              isModified: true,
              modificationDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              modificationUser: modificationUser,
              previousGrade: previousGrade
            }, {
              where: {
                examGradeID: examGradeID
              }
            });

          case 15:
            updatedGrade = _context8.sent;

            if (!updatedGrade) {
              _context8.next = 20;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Grade updated successfully'
            }));

          case 20:
            (0, _errors.returnNotFound)(res, 'Exam Grade ID');

          case 21:
            ;
            _context8.next = 28;
            break;

          case 24:
            _context8.prev = 24;
            _context8.t0 = _context8["catch"](4);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Update Exam Grade');

          case 28:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[4, 24]]);
  }));
  return _updateExamGrade.apply(this, arguments);
}

function deleteExamGrade(_x17, _x18) {
  return _deleteExamGrade.apply(this, arguments);
}

function _deleteExamGrade() {
  _deleteExamGrade = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var examGradeID, countDeleted;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            examGradeID = req.params.examGradeID;
            _context9.prev = 1;
            _context9.next = 4;
            return _ExamGrade["default"].destroy({
              where: {
                examGradeID: examGradeID
              }
            });

          case 4:
            countDeleted = _context9.sent;

            if (!(countDeleted > 0)) {
              _context9.next = 9;
              break;
            }

            return _context9.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Grade deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Grade ID');

          case 10:
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            console.log('Error:', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Delete Exam Grade');

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return _deleteExamGrade.apply(this, arguments);
}

function examGradeHomologation(score) {
  if (score > 9 && score <= 10) {
    return 'A+';
  }

  if (score > 8 && score <= 9) {
    return 'A-';
  }

  if (score > 7 && score <= 8) {
    return 'B+';
  }

  if (score > 6 && score <= 7) {
    return 'B-';
  }

  if (score > 5 && score <= 6) {
    return 'C+';
  }

  if (score > 4 && score <= 5) {
    return 'C-';
  }

  if (score > 3 && score <= 4) {
    return 'D+';
  }

  if (score > 2 && score <= 3) {
    return 'D-';
  }

  if (score > 1 && score <= 2) {
    return 'E+';
  }

  if (score > 0 && score <= 1) {
    return 'E-';
  }

  if (score === 0) {
    return 'F';
  }

  if (score < 0 || score > 10) {
    return 'Error';
  }
}