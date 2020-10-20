"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExam = createExam;
exports.getExams = getExams;
exports.getExamByID = getExamByID;
exports.getExamsBySubject = getExamsBySubject;
exports.getExamsByStudent = getExamsByStudent;
exports.getExamsByStudentAndSubject = getExamsByStudentAndSubject;
exports.updateExam = updateExam;
exports.changeActivationExam = changeActivationExam;
exports.deleteExam = deleteExam;

var _Exam = _interopRequireDefault(require("../models/Exam"));

var _Subject = _interopRequireDefault(require("../models/Subject"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Exam
function createExam(_x, _x2) {
  return _createExam.apply(this, arguments);
} // Get all Examns


function _createExam() {
  _createExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, startDate, startHour, endDate, endHour, minGrade, maxGrade, status, topic, isDelayed, minDelayed, maxDelayed, delayedDate, isPartial, isFinal, subjectID, partialExam, finalExam, newExam;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, startDate = _req$body.startDate, startHour = _req$body.startHour, endDate = _req$body.endDate, endHour = _req$body.endHour, minGrade = _req$body.minGrade, maxGrade = _req$body.maxGrade, status = _req$body.status, topic = _req$body.topic, isDelayed = _req$body.isDelayed, minDelayed = _req$body.minDelayed, maxDelayed = _req$body.maxDelayed, delayedDate = _req$body.delayedDate, isPartial = _req$body.isPartial, isFinal = _req$body.isFinal, subjectID = _req$body.subjectID;

            if (isPartial === undefined && isFinal === undefined) {
              partialExam = true;
              finalExam = false;
            } else {
              if (isPartial && isFinal || !isPartial && !isFinal) {
                partialExam = true;
                finalExam = false;
              } else {
                if (isPartial) {
                  partialExam = true;
                  finalExam = false;
                } else {
                  partialExam = false;
                  finalExam = true;
                }
              }
            }

            _context.prev = 2;
            _context.next = 5;
            return _Exam["default"].create({
              startDate: startDate,
              startHour: startHour,
              endDate: endDate,
              endHour: endHour,
              minGrade: minGrade,
              maxGrade: maxGrade,
              status: status,
              topic: topic,
              isDelayed: isDelayed,
              minDelayed: minDelayed,
              maxDelayed: maxDelayed,
              delayedDate: delayedDate,
              isPartial: partialExam,
              isFinal: finalExam,
              subjectID: subjectID
            }, {
              fields: ['startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'isPartial', 'isFinal', 'subjectID'],
              returning: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'unregisteredDate', 'isPartial', 'isFinal', 'isActive', 'subjectID']
            });

          case 5:
            newExam = _context.sent;

            if (!newExam) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam created successfully',
              exam: newExam
            }));

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Exam');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _createExam.apply(this, arguments);
}

function getExams(_x3, _x4) {
  return _getExams.apply(this, arguments);
} // Get an exam by ID


function _getExams() {
  _getExams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, exams;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Exam["default"].findAndCountAll({
              attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'isPartial', 'isFinal', 'isActive', 'unregisteredDate', 'subjectID'],
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            exams = _context2.sent;

            if (!(exams.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              exams: exams
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Exam');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Exams');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getExams.apply(this, arguments);
}

function getExamByID(_x5, _x6) {
  return _getExamByID.apply(this, arguments);
} // Get exams by Subject IS


function _getExamByID() {
  _getExamByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var examID, exam;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            examID = req.params.examID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Exam["default"].findOne({
              attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'unregisteredDate', 'isPartial', 'isFinal', 'isActive', 'subjectID'],
              where: {
                examID: examID
              },
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }]
            });

          case 4:
            exam = _context3.sent;

            if (!exam) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              exam: exam
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error: ', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Exam by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getExamByID.apply(this, arguments);
}

function getExamsBySubject(_x7, _x8) {
  return _getExamsBySubject.apply(this, arguments);
} // Get Exams by Student


function _getExamsBySubject() {
  _getExamsBySubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var subjectID, limit, from, exams;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            subjectID = req.params.subjectID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _Exam["default"].findAndCountAll({
              attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'registeredDate', 'unregisteredDate', 'isPartial', 'isFinal', 'isActive', 'subjectID'],
              where: {
                subjectID: subjectID
              },
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            exams = _context4.sent;

            if (!(exams.count > 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              exams: exams
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Exams by Subject');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getExamsBySubject.apply(this, arguments);
}

function getExamsByStudent(_x9, _x10) {
  return _getExamsByStudent.apply(this, arguments);
} // Get Exams by Student and Subject


function _getExamsByStudent() {
  _getExamsByStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var studentID, limit, from, active, count, total, exams;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            studentID = req.params.studentID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context5.prev = 4;
            _context5.next = 7;
            return _database.sequelize.query("\n            SELECT\tcount (*)\n            FROM\t\"exam\" ex,\n                    \"subject\" su,\n                    \"course\" co,\n                    \"enrollment\" en,\n                    \"student\" st\n            WHERE \tex.\"subjectID\" = su.\"subjectID\"\n                AND\tsu.\"courseID\" = co.\"courseID\"\n                AND co.\"courseID\" = en.\"courseID\"\n                AND en.\"studentID\" = st.\"studentID\"\n                AND st.\"studentID\" = ".concat(studentID, "\n                AND ex.\"isActive\" = ").concat(active, ";\n        "));

          case 7:
            count = _context5.sent;
            total = count[1].rows[0].count;

            if (!(total > 0)) {
              _context5.next = 17;
              break;
            }

            _context5.next = 12;
            return _database.sequelize.query("\n                SELECT\tex.\"examID\" idExam,\n                        ex.\"startDate\" dstart,\n                        ex.\"startHour\" hstart,\n                        ex.\"endDate\" dend,\n                        ex.\"endHour\" hend,\n                        ex.\"minGrade\" gradeMin,\n                        ex.\"maxGrade\" gradeMax,\n                        ex.\"status\" status,\n                        ex.\"topic\" topic,\n                        ex.\"isDelayed\" permitsDelay,\n                        ex.\"minDelayed\" delayedMin,\n                        ex.\"maxDelayed\" delayedMax,\n                        ex.\"registeredDate\" regDate,\n                        ex.\"unregisteredDate\" unregDate,\n                        ex.\"isPartial\" partialExam,\n                        ex.\"isFinal\" finalExam,\n                        ex.\"isActive\" acive,\n                        su.\"subjectCode\" codeSubject,\n                        su.\"subjectName\" nameSuject,\n                        co.\"courseName\" nameCourse,\n                        co.\"description\" descriptionCourse,\n                        en.\"enrollmentCode\" enrollment,\n                        st.\"studentCode\" codeStudent\n                FROM\t\"exam\" ex,\n                        \"subject\" su,\n                        \"course\" co,\n                        \"enrollment\" en,\n                        \"student\" st\n                WHERE \tex.\"subjectID\" = su.\"subjectID\"\n                    AND\tsu.\"courseID\" = co.\"courseID\"\n                    AND co.\"courseID\" = en.\"courseID\"\n                    AND en.\"studentID\" = st.\"studentID\"\n                    AND st.\"studentID\" = ".concat(studentID, "\n                    AND ex.\"isActive\" = ").concat(active, "\n                    ORDER BY ex.\"endDate\", ex.\"endHour\"\n                    LIMIT ").concat(limit, "\n                    OFFSET ").concat(from, ";\n            "));

          case 12:
            exams = _context5.sent;

            if (!exams) {
              _context5.next = 15;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              exams: exams[0],
              count: total
            }));

          case 15:
            _context5.next = 18;
            break;

          case 17:
            (0, _errors.returnNotFound)(res, 'Student ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](4);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Exams by Student');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 20]]);
  }));
  return _getExamsByStudent.apply(this, arguments);
}

function getExamsByStudentAndSubject(_x11, _x12) {
  return _getExamsByStudentAndSubject.apply(this, arguments);
} // Update an exam


function _getExamsByStudentAndSubject() {
  _getExamsByStudentAndSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$params, studentID, subjectID, limit, from, active, count, total, exams;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$params = req.params, studentID = _req$params.studentID, subjectID = _req$params.subjectID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context6.prev = 4;
            _context6.next = 7;
            return _database.sequelize.query("\n            SELECT\tcount (*)\n            FROM\t\"exam\" ex,\n                    \"subject\" su,\n                    \"course\" co,\n                    \"enrollment\" en,\n                    \"student\" st\n            WHERE \tex.\"subjectID\" = su.\"subjectID\"\n                AND\tsu.\"courseID\" = co.\"courseID\"\n                AND co.\"courseID\" = en.\"courseID\"\n                AND en.\"studentID\" = st.\"studentID\"\n                AND st.\"studentID\" = ".concat(studentID, "\n                AND su.\"subjectID\" = ").concat(subjectID, "\n                AND ex.\"isActive\" = ").concat(active, ";\n        "));

          case 7:
            count = _context6.sent;
            total = count[1].rows[0].count;

            if (!(total > 0)) {
              _context6.next = 17;
              break;
            }

            _context6.next = 12;
            return _database.sequelize.query("\n                SELECT\tex.\"examID\" idExam,\n                        ex.\"startDate\" dstart,\n                        ex.\"startHour\" hstart,\n                        ex.\"endDate\" dend,\n                        ex.\"endHour\" hend,\n                        ex.\"minGrade\" gradeMin,\n                        ex.\"maxGrade\" gradeMax,\n                        ex.\"status\" status,\n                        ex.\"topic\" topic,\n                        ex.\"isDelayed\" permitsDelay,\n                        ex.\"minDelayed\" delayedMin,\n                        ex.\"maxDelayed\" delayedMax,\n                        ex.\"registeredDate\" regDate,\n                        ex.\"unregisteredDate\" unregDate,\n                        ex.\"isPartial\" partialExam,\n                        ex.\"isFinal\" finalExam,\n                        ex.\"isActive\" acive,\n                        su.\"subjectCode\" codeSubject,\n                        su.\"subjectName\" nameSuject,\n                        co.\"courseName\" nameCourse,\n                        co.\"description\" descriptionCourse,\n                        en.\"enrollmentCode\" enrollment,\n                        st.\"studentCode\" codeStudent\n                FROM\t\"exam\" ex,\n                        \"subject\" su,\n                        \"course\" co,\n                        \"enrollment\" en,\n                        \"student\" st\n                WHERE \tex.\"subjectID\" = su.\"subjectID\"\n                    AND\tsu.\"courseID\" = co.\"courseID\"\n                    AND co.\"courseID\" = en.\"courseID\"\n                    AND en.\"studentID\" = st.\"studentID\"\n                    AND st.\"studentID\" = ".concat(studentID, "\n                    AND su.\"subjectID\" = ").concat(subjectID, "\n                    AND ex.\"isActive\" = ").concat(active, "\n                    ORDER BY ex.\"endDate\", ex.\"endHour\"\n                    LIMIT ").concat(limit, "\n                    OFFSET ").concat(from, ";\n            "));

          case 12:
            exams = _context6.sent;

            if (!exams) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              exams: exams[0],
              count: total
            }));

          case 15:
            _context6.next = 18;
            break;

          case 17:
            (0, _errors.returnNotFound)(res, 'Student ID or Subject IS');

          case 18:
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](4);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Exams by Student');

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 20]]);
  }));
  return _getExamsByStudentAndSubject.apply(this, arguments);
}

function updateExam(_x13, _x14) {
  return _updateExam.apply(this, arguments);
} // Change activation status of an exam


function _updateExam() {
  _updateExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var examID, _req$body2, startDate, startHour, endDate, endHour, minGrade, maxGrade, status, topic, isDelayed, minDelayed, maxDelayed, delayedDate, isPartial, isFinal, subjectID, partialExam, finalExam, dbExam, updatedExam;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            examID = req.params.examID;
            _req$body2 = req.body, startDate = _req$body2.startDate, startHour = _req$body2.startHour, endDate = _req$body2.endDate, endHour = _req$body2.endHour, minGrade = _req$body2.minGrade, maxGrade = _req$body2.maxGrade, status = _req$body2.status, topic = _req$body2.topic, isDelayed = _req$body2.isDelayed, minDelayed = _req$body2.minDelayed, maxDelayed = _req$body2.maxDelayed, delayedDate = _req$body2.delayedDate, isPartial = _req$body2.isPartial, isFinal = _req$body2.isFinal, subjectID = _req$body2.subjectID;

            if (isPartial === undefined && isFinal === undefined) {
              partialExam = true;
              finalExam = false;
            } else {
              if (isPartial && isFinal || !isPartial && !isFinal) {
                partialExam = true;
                finalExam = false;
              } else {
                if (isPartial) {
                  partialExam = true;
                  finalExam = false;
                } else {
                  partialExam = false;
                  finalExam = true;
                }
              }
            }

            _context7.prev = 3;
            _context7.next = 6;
            return _Exam["default"].findOne({
              attributes: ['examID', 'startDate', 'startHour', 'endDate', 'endHour', 'minGrade', 'maxGrade', 'status', 'topic', 'isDelayed', 'minDelayed', 'maxDelayed', 'delayedDate', 'isPartial', 'isFinal', 'subjectID'],
              where: {
                examID: examID
              }
            });

          case 6:
            dbExam = _context7.sent;

            if (!(dbExam === null || dbExam === undefined)) {
              _context7.next = 11;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam ID');
            _context7.next = 19;
            break;

          case 11:
            _context7.next = 13;
            return _Exam["default"].update({
              startDate: startDate,
              startHour: startHour,
              endDate: endDate,
              endHour: endHour,
              minGrade: minGrade,
              maxGrade: maxGrade,
              status: status,
              topic: topic,
              isDelayed: isDelayed,
              minDelayed: minDelayed,
              maxDelayed: maxDelayed,
              delayedDate: delayedDate,
              isPartial: partialExam,
              isFinal: finalExam,
              subjectID: subjectID
            }, {
              where: {
                examID: examID
              }
            });

          case 13:
            updatedExam = _context7.sent;

            if (!updatedExam) {
              _context7.next = 18;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam updated successfully'
            }));

          case 18:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 19:
            _context7.next = 25;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](3);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Update Exam');

          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 21]]);
  }));
  return _updateExam.apply(this, arguments);
}

function changeActivationExam(_x15, _x16) {
  return _changeActivationExam.apply(this, arguments);
} // Delete an exam


function _changeActivationExam() {
  _changeActivationExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var examID, type, value, action, afirmation, negation, changeActivationJSON, dbExam, changeActivation;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            examID = req.params.examID;
            type = req.query.type;
            action = '';
            afirmation = '';
            negation = '';

            if (type.toLowerCase() === 'activate') {
              value = true, action = 'Activating';
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
                returnWrongError(res, 'type', 'request');
              }
            }

            _context8.prev = 6;
            _context8.next = 9;
            return _Exam["default"].findOne({
              attributes: ['examID', 'registeredDate', 'unregisteredDate', 'isActive', 'subjectID'],
              where: {
                examID: examID
              }
            });

          case 9:
            dbExam = _context8.sent;

            if (!dbExam) {
              _context8.next = 21;
              break;
            }

            _context8.next = 13;
            return _Exam["default"].update(changeActivationJSON, {
              where: {
                examID: examID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context8.sent;

            if (!(changeActivation > 0)) {
              _context8.next = 18;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Exam or Exam alread ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context8.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 22:
            _context8.next = 28;
            break;

          case 24:
            _context8.prev = 24;
            _context8.t0 = _context8["catch"](6);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Change Activation Exam');

          case 28:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[6, 24]]);
  }));
  return _changeActivationExam.apply(this, arguments);
}

function deleteExam(_x17, _x18) {
  return _deleteExam.apply(this, arguments);
}

function _deleteExam() {
  _deleteExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var examID, countDeleted;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            examID = req.params.examID;
            _context9.prev = 1;
            _context9.next = 4;
            return _Exam["default"].destroy({
              where: {
                examID: examID
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
              message: 'Exam deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 10:
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            console.log('Error:', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Delete Exam');

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return _deleteExam.apply(this, arguments);
}