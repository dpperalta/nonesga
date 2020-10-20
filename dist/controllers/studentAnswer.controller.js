"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStudentAnswer = createStudentAnswer;
exports.getStudentAnswers = getStudentAnswers;
exports.getStudentAnswerByID = getStudentAnswerByID;
exports.getStudentAnswersByStudent = getStudentAnswersByStudent;
exports.getStudentAnswersByExam = getStudentAnswersByExam;
exports.getStudentAnswersByExamAndStudent = getStudentAnswersByExamAndStudent;
exports.updateStudentAnswerByTeacher = updateStudentAnswerByTeacher;
exports.updateStudentAnswerByStudent = updateStudentAnswerByStudent;
exports.publishStudenAnswer = publishStudenAnswer;
exports.updateDetails = updateDetails;
exports.deleteStudentAnswer = deleteStudentAnswer;

var _StudentAnswer = _interopRequireDefault(require("../models/StudentAnswer"));

var _ExamAnswer = _interopRequireDefault(require("../models/ExamAnswer"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _database = require("../database/database");

var _errors = require("./errors");

var _ExamQuestion = _interopRequireDefault(require("../models/ExamQuestion"));

var _Exam = _interopRequireDefault(require("../models/Exam"));

var _Person = _interopRequireDefault(require("../models/Person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Student Answer
function createStudentAnswer(_x, _x2) {
  return _createStudentAnswer.apply(this, arguments);
} // Get all Student Answers


function _createStudentAnswer() {
  _createStudentAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, grade, studentAnswer, answerID, studentID, questionID, newStudentAnswer;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, grade = _req$body.grade, studentAnswer = _req$body.studentAnswer, answerID = _req$body.answerID, studentID = _req$body.studentID, questionID = _req$body.questionID;

            if (!(studentID === undefined || studentID === null)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Request error, missing required data - Student'
            }));

          case 3:
            if (!((answerID === undefined || answerID === null) && (studentAnswer === undefined || studentAnswer === null))) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Request error, missing requiered data - Answer'
            }));

          case 5:
            if (!(answerID !== undefined)) {
              _context.next = 10;
              break;
            }

            if (!(studentAnswer !== undefined)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'There is more than one answer for the question - Student Answer'
            }));

          case 8:
            _context.next = 12;
            break;

          case 10:
            if (!(answerID !== undefined)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'There is more than one answer for the question - Exam Answer'
            }));

          case 12:
            _context.prev = 12;
            _context.next = 15;
            return _StudentAnswer["default"].create({
              grade: grade,
              studentAnswer: studentAnswer,
              answerID: answerID,
              studentID: studentID,
              questionID: questionID
            }, {
              fields: ['grade', 'studentAnswer', 'answerID', 'studentID', 'questionID'],
              returning: ['studentAnswerID', 'selectedDate', 'grade', 'studentAnswer', 'teacherDetails', 'agentDetails', 'studentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'answerID', 'studentID', 'questionID']
            });

          case 15:
            newStudentAnswer = _context.sent;

            if (!newStudentAnswer) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Studen Answer created successfully',
              studentAnswer: newStudentAnswer
            }));

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](12);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Student Answer');

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 20]]);
  }));
  return _createStudentAnswer.apply(this, arguments);
}

function getStudentAnswers(_x3, _x4) {
  return _getStudentAnswers.apply(this, arguments);
} // Get an Studen Answer by ID


function _getStudentAnswers() {
  _getStudentAnswers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, studentAnswers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _StudentAnswer["default"].findAndCountAll({
              attributes: ['studentAnswerID', 'selectedDate', 'grade', 'teacherDetails', 'studentDetails', 'agentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'tryNumber', 'answerID', 'studentID', 'questionID'],
              include: [{
                model: _ExamAnswer["default"],
                attributes: ['answerID', 'answer', 'grade', 'isCorrect'],
                include: [{
                  model: _ExamQuestion["default"],
                  attributes: ['questionID', 'question'],
                  include: [{
                    model: _Exam["default"],
                    attributes: ['examID', 'topic', 'startDate', 'endDate']
                  }]
                }]
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 5:
            studentAnswers = _context2.sent;

            if (!(studentAnswers.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              studentAnswers: studentAnswers
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Studen Answer');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get All Student Answers');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getStudentAnswers.apply(this, arguments);
}

function getStudentAnswerByID(_x5, _x6) {
  return _getStudentAnswerByID.apply(this, arguments);
} // Get all answer by a Student


function _getStudentAnswerByID() {
  _getStudentAnswerByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var studentAnswerID, studentAnswer;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            studentAnswerID = req.params.studentAnswerID;
            _context3.prev = 1;
            _context3.next = 4;
            return _StudentAnswer["default"].findOne({
              attributes: ['studentAnswerID', 'selectedDate', 'grade', 'teacherDetails', 'studentDetails', 'agentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'tryNumber', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'answerID', 'studentID', 'questionID'],
              where: {
                studentAnswerID: studentAnswerID
              },
              include: [{
                model: _ExamAnswer["default"],
                attributes: ['answerID', 'answer', 'grade', 'isCorrect'],
                include: [{
                  model: _ExamQuestion["default"],
                  attributes: ['questionID', 'question'],
                  include: [{
                    model: _Exam["default"],
                    attributes: ['examID', 'topic', 'startDate', 'endDate']
                  }]
                }]
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }]
            });

          case 4:
            studentAnswer = _context3.sent;

            if (!studentAnswer) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              studentAnswer: studentAnswer
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Student Answer ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Student Answer by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getStudentAnswerByID.apply(this, arguments);
}

function getStudentAnswersByStudent(_x7, _x8) {
  return _getStudentAnswersByStudent.apply(this, arguments);
} // Get all answers by exam


function _getStudentAnswersByStudent() {
  _getStudentAnswersByStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var studentID, limit, from, studentAnswer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            studentID = req.params.studentID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _StudentAnswer["default"].findAndCountAll({
              attributes: ['studentAnswerID', 'selectedDate', 'grade', 'teacherDetails', 'studentDetails', 'agentDetails', 'isReviewed', 'isActive', 'isPublished', 'publishedDate', 'tryNumber', 'teacherUpdates', 'studentUpdates', 'agentUpdates', 'answerID', 'studentID', 'questionID'],
              where: {
                studentID: studentID
              },
              include: [{
                model: _ExamAnswer["default"],
                attributes: ['answerID', 'answer', 'grade', 'isCorrect'],
                include: [{
                  model: _ExamQuestion["default"],
                  attributes: ['questionID', 'question'],
                  include: [{
                    model: _Exam["default"],
                    attributes: ['examID', 'topic', 'startDate', 'endDate']
                  }]
                }]
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 6:
            studentAnswer = _context4.sent;

            if (!(studentAnswer.count > 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              studentAnswer: studentAnswer
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
            (0, _errors.returnError)(res, _context4.t0, 'Get Student Answer by Student');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getStudentAnswersByStudent.apply(this, arguments);
}

function getStudentAnswersByExam(_x9, _x10) {
  return _getStudentAnswersByExam.apply(this, arguments);
} // Get all answers of an student of an exam


function _getStudentAnswersByExam() {
  _getStudentAnswersByExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var examID, limit, from, active, activeQuery, counter, total, examAnswers;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            examID = req.params.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active;

            if (active === undefined || active === null) {
              activeQuery = '';
            } else {
              activeQuery = "AND ex.\"isActive\" = ".concat(active);
            }

            _context5.prev = 5;
            _context5.next = 8;
            return _database.sequelize.query("\n            SELECT\tCOUNT (*)\n            FROM \"studentAnswer\" sa, \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex, \"student\" st, \"person\" pe\n            WHERE \tsa.\"answerID\" = ea.\"answerID\"\n                AND\tea.\"questionID\" = eq.\"questionID\"\n                AND eq.\"examID\" = ex.\"examID\"\n                AND sa.\"studentID\" = st.\"studentID\"\n                AND st.\"personID\" = pe.\"personID\"\n                AND ex.\"examID\" = ".concat(examID, "\n                ").concat(activeQuery, "     \n        "));

          case 8:
            counter = _context5.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context5.next = 18;
              break;
            }

            _context5.next = 13;
            return _database.sequelize.query("\n                SELECT\tsa.\"studentAnswerID\" idStudentAnswer,\n                        sa.\"selectedDate\" selectionDate,\n                        sa.\"grade\" grade,\n                        sa.\"studentAnswer\" studentAnswer,\n                        sa.\"teacherDetails\" teacherComents,\n                        sa.\"studentDetails\" studentComents,\n                        sa.\"agentDetails\" agentComents,\n                        sa.\"isReviewed\" reviewed,\n                        sa.\"isActive\" active,\n                        sa.\"isPublished\" published,\n                        sa.\"publishedDate\" publishedDate,\n                        sa.\"tryNumber\" attempt,\n                        sa.\"teacherUpdates\" teacherUpdates,\n                        sa.\"studentUpdates\" studentUpdates,\n                        sa.\"agentUpdates\", agentUpdates,\n                        ea.\"answerID\" idAnswer,\n                        ea.\"answer\" noneAnswer,\n                        ea.\"grade\" noneGrade,\n                        ea.\"isCorrect\" noneCorrect,\n                        eq.\"questionID\" idQuestion,\n                        eq.\"question\" question,\n                        ex.\"examID\" idExam,\n                        ex.\"topic\" theme,\n                        ex.\"startDate\" dateStart,\n                        ex.\"endDate\" dateEnd,\n                        st.\"studentID\" idStudent,\n                        st.\"studentCode\" code,\n                        pe.\"personID\" idPerson,\n                        pe.\"completeName\" personNames\n                FROM \"studentAnswer\" sa, \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex, \"student\" st, \"person\" pe\n                WHERE \tsa.\"answerID\" = ea.\"answerID\"\n                    AND\tea.\"questionID\" = eq.\"questionID\"\n                    AND eq.\"examID\" = ex.\"examID\"\n                    AND sa.\"studentID\" = st.\"studentID\"\n                    AND st.\"personID\" = pe.\"personID\"\n                    AND ex.\"examID\" = ".concat(examID, "\n                    ").concat(activeQuery, "\n                    ORDER BY pe.\"lastNames\" ASC\n                    LIMIT ").concat(limit, "\n                    OFFSET ").concat(from, "\n            "));

          case 13:
            examAnswers = _context5.sent;

            if (!examAnswers) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              examAnswers: examAnswers[0],
              count: total
            }));

          case 16:
            _context5.next = 19;
            break;

          case 18:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 19:
            _context5.next = 25;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](5);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Student Answers by Exam');

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 21]]);
  }));
  return _getStudentAnswersByExam.apply(this, arguments);
}

function getStudentAnswersByExamAndStudent(_x11, _x12) {
  return _getStudentAnswersByExamAndStudent.apply(this, arguments);
} // Update an Student Answer by Teacher


function _getStudentAnswersByExamAndStudent() {
  _getStudentAnswersByExamAndStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$params, examID, studentID, limit, from, active, activeQuery, counter, total, examAnswers;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$params = req.params, examID = _req$params.examID, studentID = _req$params.studentID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active;

            if (active === undefined || active === null) {
              activeQuery = '';
            } else {
              activeQuery = "AND ex.\"isActive\" = ".concat(active);
            }

            _context6.prev = 5;
            _context6.next = 8;
            return _database.sequelize.query("\n            SELECT\tCOUNT (*)\n            FROM \"studentAnswer\" sa, \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex, \"student\" st, \"person\" pe\n            WHERE \tsa.\"answerID\" = ea.\"answerID\"\n                AND\tea.\"questionID\" = eq.\"questionID\"\n                AND eq.\"examID\" = ex.\"examID\"\n                AND sa.\"studentID\" = st.\"studentID\"\n                AND st.\"personID\" = pe.\"personID\"\n                AND ex.\"examID\" = ".concat(examID, "\n                AND sa.\"studentID\" = ").concat(studentID, "\n                ").concat(activeQuery, "     \n        "));

          case 8:
            counter = _context6.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context6.next = 18;
              break;
            }

            _context6.next = 13;
            return _database.sequelize.query("\n                SELECT\tsa.\"studentAnswerID\" idStudentAnswer,\n                        sa.\"selectedDate\" selectionDate,\n                        sa.\"grade\" grade,\n                        sa.\"studentAnswer\" studentAnswer,\n                        sa.\"teacherDetails\" teacherComents,\n                        sa.\"studentDetails\" studentComents,\n                        sa.\"agentDetails\" agentComents,\n                        sa.\"isReviewed\" reviewed,\n                        sa.\"isActive\" active,\n                        sa.\"isPublished\" published,\n                        sa.\"publishedDate\" publishedDate,\n                        sa.\"tryNumber\" attempt,\n                        sa.\"teacherUpdates\" teacherUpdates,\n                        sa.\"studentUpdates\" studentUpdates,\n                        sa.\"agentUpdates\", agentUpdates,\n                        ea.\"answerID\" idAnswer,\n                        ea.\"answer\" noneAnswer,\n                        ea.\"grade\" noneGrade,\n                        ea.\"isCorrect\" noneCorrect,\n                        eq.\"questionID\" idQuestion,\n                        eq.\"question\" question,\n                        ex.\"examID\" idExam,\n                        ex.\"topic\" theme,\n                        ex.\"startDate\" dateStart,\n                        ex.\"endDate\" dateEnd,\n                        st.\"studentID\" idStudent,\n                        st.\"studentCode\" code,\n                        pe.\"personID\" idPerson,\n                        pe.\"completeName\" personNames\n                FROM \"studentAnswer\" sa, \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex, \"student\" st, \"person\" pe\n                WHERE \tsa.\"answerID\" = ea.\"answerID\"\n                    AND\tea.\"questionID\" = eq.\"questionID\"\n                    AND eq.\"examID\" = ex.\"examID\"\n                    AND sa.\"studentID\" = st.\"studentID\"\n                    AND st.\"personID\" = pe.\"personID\"\n                    AND ex.\"examID\" = ".concat(examID, "\n                    AND sa.\"studentID\" = ").concat(studentID, "\n                    ").concat(activeQuery, "\n                    ORDER BY pe.\"lastNames\" ASC\n                    LIMIT ").concat(limit, "\n                    OFFSET ").concat(from, "\n            "));

          case 13:
            examAnswers = _context6.sent;

            if (!examAnswers) {
              _context6.next = 16;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              examAnswers: examAnswers[0],
              count: total
            }));

          case 16:
            _context6.next = 19;
            break;

          case 18:
            (0, _errors.returnNotFound)(res, 'Exam ID or Student ID');

          case 19:
            _context6.next = 25;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](5);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Student Answers by Exam and Student');

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[5, 21]]);
  }));
  return _getStudentAnswersByExamAndStudent.apply(this, arguments);
}

function updateStudentAnswerByTeacher(_x13, _x14) {
  return _updateStudentAnswerByTeacher.apply(this, arguments);
} // Update an Studen Answer by Student


function _updateStudentAnswerByTeacher() {
  _updateStudentAnswerByTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var studentAnswerID, _req$body2, grade, teacherDetails, isReviewed, dbStudentAnswer, updatedStudentAnswer;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            studentAnswerID = req.params.studentAnswerID;
            _req$body2 = req.body, grade = _req$body2.grade, teacherDetails = _req$body2.teacherDetails, isReviewed = _req$body2.isReviewed;
            _context7.prev = 2;
            _context7.next = 5;
            return _StudentAnswer["default"].findOne({
              attributes: ['studentAnswerID', 'tryNumber', 'grade', 'teacherDetails', 'isReviewed'],
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 5:
            dbStudentAnswer = _context7.sent;

            if (!(dbStudentAnswer === null || dbStudentAnswer === undefined)) {
              _context7.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Student Answer ID');
            _context7.next = 18;
            break;

          case 10:
            _context7.next = 12;
            return _StudentAnswer["default"].update({
              grade: grade,
              teacherDetails: teacherDetails,
              isReviewed: isReviewed,
              teacherUpdates: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 12:
            updatedStudentAnswer = _context7.sent;

            if (!updatedStudentAnswer) {
              _context7.next = 17;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Student Answer updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Student Answer ID');

          case 18:
            _context7.next = 24;
            break;

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](2);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Update Student Answer');

          case 24:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 20]]);
  }));
  return _updateStudentAnswerByTeacher.apply(this, arguments);
}

function updateStudentAnswerByStudent(_x15, _x16) {
  return _updateStudentAnswerByStudent.apply(this, arguments);
} // Publish answers for an exam


function _updateStudentAnswerByStudent() {
  _updateStudentAnswerByStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var studentAnswerID, _req$body3, studentAnswer, studentDetails, answerID, dbStudentAnswer, attempNumber, updatedStudentAnswer;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            studentAnswerID = req.params.studentAnswerID;
            _req$body3 = req.body, studentAnswer = _req$body3.studentAnswer, studentDetails = _req$body3.studentDetails, answerID = _req$body3.answerID;

            if (!((answerID === undefined || answerID === null) && (studentAnswer === undefined || studentAnswer === null))) {
              _context8.next = 4;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Request error, missing requiered data - Answer'
            }));

          case 4:
            if (!(answerID !== undefined)) {
              _context8.next = 9;
              break;
            }

            if (!(studentAnswer !== undefined)) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'There is more than one answer for the question - Student Answer'
            }));

          case 7:
            _context8.next = 11;
            break;

          case 9:
            if (!(answerID !== undefined)) {
              _context8.next = 11;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'There is more than one answer for the question - Exam Answer'
            }));

          case 11:
            _context8.prev = 11;
            _context8.next = 14;
            return _StudentAnswer["default"].findOne({
              attributes: ['studentAnswer', 'tryNumber', 'answerID', 'studentAnswer'],
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 14:
            dbStudentAnswer = _context8.sent;
            attempNumber = dbStudentAnswer.dataValues.tryNumber;

            if (!(dbStudentAnswer === null || dbStudentAnswer === undefined)) {
              _context8.next = 20;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Student Answer ID');
            _context8.next = 26;
            break;

          case 20:
            updatedStudentAnswer = _StudentAnswer["default"].update({
              studentAnswer: studentAnswer,
              answerID: answerID,
              studentDetails: studentDetails,
              tryNumber: attempNumber + 1,
              studentUpdates: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                studentAnswerID: studentAnswerID
              }
            });

            if (!updatedStudentAnswer) {
              _context8.next = 25;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Student Answer updated successfully'
            }));

          case 25:
            (0, _errors.returnNotFound)(res, 'Student Answer ID');

          case 26:
            _context8.next = 32;
            break;

          case 28:
            _context8.prev = 28;
            _context8.t0 = _context8["catch"](11);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Update Student Answer by Student');

          case 32:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[11, 28]]);
  }));
  return _updateStudentAnswerByStudent.apply(this, arguments);
}

function publishStudenAnswer(_x17, _x18) {
  return _publishStudenAnswer.apply(this, arguments);
} // Add Student or Agent Details


function _publishStudenAnswer() {
  _publishStudenAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var _req$body4, studentID, examID, counter, total, publishExam, countUpdated;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body4 = req.body, studentID = _req$body4.studentID, examID = _req$body4.examID;
            _context9.prev = 1;
            _context9.next = 4;
            return _database.sequelize.query("\n            SELECT COUNT (*)\n            FROM \"studentAnswer\" sa, \"examQuestion\" eq, \"exam\" ex\n                WHERE sa.\"questionID\" = eq.\"questionID\"\n                    AND eq.\"examID\" = ex.\"examID\"\n                    AND ex.\"examID\" = ".concat(examID, "\n                    AND sa.\"studentID\" = ").concat(studentID, "\n                    AND sa.\"isPublished\" = false\n        "));

          case 4:
            counter = _context9.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context9.next = 18;
              break;
            }

            _context9.next = 9;
            return _database.sequelize.query("\n                UPDATE \"studentAnswer\"\n                    SET \"isPublished\" = true,\n                        \"publishedDate\" = CURRENT_TIMESTAMP\n                    WHERE \"questionID\" IN (SELECT sa.\"questionID\"\n                                            FROM \"studentAnswer\" sa, \"examQuestion\" eq, \"exam\" ex\n                                                WHERE sa.\"questionID\" = eq.\"questionID\"\n                                                    AND eq.\"examID\" = ex.\"examID\"\n                                                    AND ex.\"examID\" = ".concat(examID, "\n                                                    AND sa.\"studentID\" = ").concat(studentID, "\n                                                    AND sa.\"isPublished\" = false)\n                    AND \"studentID\" = ").concat(studentID, "\n                    AND \"isPublished\" = false;\n            "));

          case 9:
            publishExam = _context9.sent;
            countUpdated = publishExam[1].rowCount;

            if (!(countUpdated > 0)) {
              _context9.next = 15;
              break;
            }

            return _context9.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Answers published successfully, total of answers published: ' + countUpdated,
              totalAnswersPublished: countUpdated
            }));

          case 15:
            return _context9.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Any exam answer published or exam already published'
            }));

          case 16:
            _context9.next = 19;
            break;

          case 18:
            return _context9.abrupt("return", res.status(400).json({
              ok: false,
              message: 'An error occurred when trying to publish the exam or the exam was already published'
            }));

          case 19:
            _context9.next = 25;
            break;

          case 21:
            _context9.prev = 21;
            _context9.t0 = _context9["catch"](1);
            console.log('Error: ', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Publishing Exam');

          case 25:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 21]]);
  }));
  return _publishStudenAnswer.apply(this, arguments);
}

function updateDetails(_x19, _x20) {
  return _updateDetails.apply(this, arguments);
} // Delete an Student Aswer


function _updateDetails() {
  _updateDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var studentAnswerID, _req$body5, studentDetails, agentDetails, type, dbStudentAnswer, udpateStudentDetails, updateAgentDetails;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            studentAnswerID = req.params.studentAnswerID;
            _req$body5 = req.body, studentDetails = _req$body5.studentDetails, agentDetails = _req$body5.agentDetails;
            type = req.query.type;

            if (!(type.toLowerCase() === 'student' || type.toLowerCase() === 'agent')) {
              _context10.next = 46;
              break;
            }

            if (!(type.toLowerCase() === 'student' && studentDetails === undefined)) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Students Details not presents for update'
            }));

          case 6:
            if (!(type.toLowerCase() === 'agent' && agentDetails === undefined)) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Agent Details not presents for update'
            }));

          case 8:
            _context10.prev = 8;
            _context10.next = 11;
            return _StudentAnswer["default"].findOne({
              attributes: ['studentAnswerID', 'studentDetails', 'agentDetails'],
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 11:
            dbStudentAnswer = _context10.sent;
            console.log('studentAnswer', dbStudentAnswer);

            if (!(dbStudentAnswer === null | dbStudentAnswer === undefined)) {
              _context10.next = 17;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Student Answer ID');
            _context10.next = 38;
            break;

          case 17:
            if (!(type.toLowerCase() === 'student')) {
              _context10.next = 29;
              break;
            }

            _context10.next = 20;
            return _StudentAnswer["default"].update({
              studentDetails: studentDetails,
              studentUpdates: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 20:
            udpateStudentDetails = _context10.sent;

            if (!udpateStudentDetails) {
              _context10.next = 25;
              break;
            }

            return _context10.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Student Details updated successfully'
            }));

          case 25:
            (0, _errors.returnNotFound)(res, 'Student Answer ID');
            return _context10.abrupt("return");

          case 27:
            _context10.next = 38;
            break;

          case 29:
            _context10.next = 31;
            return _StudentAnswer["default"].update({
              agentDetails: agentDetails,
              agentUpdates: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 31:
            updateAgentDetails = _context10.sent;

            if (!updateAgentDetails) {
              _context10.next = 36;
              break;
            }

            return _context10.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Agent Details updated successfully'
            }));

          case 36:
            (0, _errors.returnNotFound)(res, 'Student Answer ID');
            return _context10.abrupt("return");

          case 38:
            _context10.next = 44;
            break;

          case 40:
            _context10.prev = 40;
            _context10.t0 = _context10["catch"](8);
            console.log('Error:', _context10.t0);
            (0, _errors.returnError)(res, _context10.t0, 'Update Agent or Student Details');

          case 44:
            _context10.next = 47;
            break;

          case 46:
            (0, _errors.returnWrongError)(res, 'type', 'Update Details Type');

          case 47:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[8, 40]]);
  }));
  return _updateDetails.apply(this, arguments);
}

function deleteStudentAnswer(_x21, _x22) {
  return _deleteStudentAnswer.apply(this, arguments);
}

function _deleteStudentAnswer() {
  _deleteStudentAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var studentAnswerID, countDeleted;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            studentAnswerID = req.params.studentAnswerID;
            _context11.prev = 1;
            _context11.next = 4;
            return _StudentAnswer["default"].destroy({
              where: {
                studentAnswerID: studentAnswerID
              }
            });

          case 4:
            countDeleted = _context11.sent;

            if (!(countDeleted > 0)) {
              _context11.next = 9;
              break;
            }

            return _context11.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Student Answer deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Student Answer ID');

          case 10:
            _context11.next = 16;
            break;

          case 12:
            _context11.prev = 12;
            _context11.t0 = _context11["catch"](1);
            console.log('Error:', _context11.t0);
            (0, _errors.returnError)(res, _context11.t0, 'Delete Student Answer');

          case 16:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 12]]);
  }));
  return _deleteStudentAnswer.apply(this, arguments);
}