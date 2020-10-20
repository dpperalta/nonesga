"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExamRegister = createExamRegister;
exports.getExamRegisters = getExamRegisters;
exports.getExamRegisterByID = getExamRegisterByID;
exports.getExamRegistersByStudent = getExamRegistersByStudent;
exports.getExamRegistersByStudentActiveExam = getExamRegistersByStudentActiveExam;
exports.getExamRegistersByAllExams = getExamRegistersByAllExams;
exports.getExamRegistersByActiveExams = getExamRegistersByActiveExams;
exports.getExamRegisterBySubject = getExamRegisterBySubject;
exports.updateExamRegister = updateExamRegister;
exports.reviewExamRegister = reviewExamRegister;
exports.registerExamRegister = registerExamRegister;
exports.deleteExamRegister = deleteExamRegister;

var _ExamRegister = _interopRequireDefault(require("../models/ExamRegister"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _Exam = _interopRequireDefault(require("../models/Exam"));

var _errors = require("./errors");

var _Person = _interopRequireDefault(require("../models/Person"));

var _User = _interopRequireDefault(require("../models/User"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new exam Register;
function createExamRegister(_x, _x2) {
  return _createExamRegister.apply(this, arguments);
} // Get all Exam Registers


function _createExamRegister() {
  _createExamRegister = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, generalDetail, studentID, examID, userID, newExamRegister;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, generalDetail = _req$body.generalDetail, studentID = _req$body.studentID, examID = _req$body.examID, userID = _req$body.userID;
            _context.prev = 1;
            _context.next = 4;
            return _ExamRegister["default"].create({
              status: 1,
              reviewNumber: 1,
              generalDetail: generalDetail,
              studentID: studentID,
              examID: examID,
              userID: userID
            }, {
              fields: ['status', 'reviewNumber', 'generalDetail', 'studentID', 'examID', 'userID'],
              returnint: ['registerID', 'registeredDate', 'userID', 'status', 'reviewNumber', 'lastStatus', 'lastStatusDate', 'lastStatusUser', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'examID']
            });

          case 4:
            newExamRegister = _context.sent;

            if (!newExamRegister) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Register created successfully',
              examRegister: newExamRegister
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Exam Register');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createExamRegister.apply(this, arguments);
}

function getExamRegisters(_x3, _x4) {
  return _getExamRegisters.apply(this, arguments);
} // Get an Exam Register by ID


function _getExamRegisters() {
  _getExamRegisters = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, examRegisters;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _ExamRegister["default"].findAndCountAll({
              attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
              include: [{
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Exam["default"],
                attributes: ['examID', 'startDate', 'endDate', 'topic']
              }, {
                model: _User["default"],
                attributes: ['userID', 'nick', 'email', 'status']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            examRegisters = _context2.sent;

            if (!(examRegisters.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              examRegisters: examRegisters
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Exam Register');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Exam Registers');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getExamRegisters.apply(this, arguments);
}

function getExamRegisterByID(_x5, _x6) {
  return _getExamRegisterByID.apply(this, arguments);
} // Get all Exam Registers by Student


function _getExamRegisterByID() {
  _getExamRegisterByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var registerID, examRegister;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            registerID = req.params.registerID;
            _context3.prev = 1;
            _context3.next = 4;
            return _ExamRegister["default"].findOne({
              attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
              where: {
                registerID: registerID
              },
              include: [{
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Exam["default"],
                attributes: ['examID', 'startDate', 'endDate', 'topic']
              }, {
                model: _User["default"],
                attributes: ['userID', 'nick', 'email', 'status']
              }]
            });

          case 4:
            examRegister = _context3.sent;

            if (!examRegister) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              examRegister: examRegister
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Register ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Exam Register by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getExamRegisterByID.apply(this, arguments);
}

function getExamRegistersByStudent(_x7, _x8) {
  return _getExamRegistersByStudent.apply(this, arguments);
} // Get all Exam Registers by Student for an Active/Inactive Exam


function _getExamRegistersByStudent() {
  _getExamRegistersByStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var studentID, limit, from, examRegisters;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            studentID = req.params.studentID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _ExamRegister["default"].findAndCountAll({
              attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
              where: {
                studentID: studentID
              },
              include: [{
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Exam["default"],
                attributes: ['examID', 'startDate', 'endDate', 'topic']
              }, {
                model: _User["default"],
                attributes: ['userID', 'nick', 'email', 'status']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examRegisters = _context4.sent;

            if (!(examRegisters.count > 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              examRegisters: examRegisters
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
            (0, _errors.returnError)(res, _context4.t0, 'Get Exam Registers by Student');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getExamRegistersByStudent.apply(this, arguments);
}

function getExamRegistersByStudentActiveExam(_x9, _x10) {
  return _getExamRegistersByStudentActiveExam.apply(this, arguments);
} // Get all Exam Registers by Exam


function _getExamRegistersByStudentActiveExam() {
  _getExamRegistersByStudentActiveExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var studentID, limit, from, active, examRegisters;
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
            return _ExamRegister["default"].findAndCountAll({
              attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
              where: {
                studentID: studentID
              },
              include: [{
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Exam["default"],
                attributes: ['examID', 'startDate', 'endDate', 'topic'],
                where: {
                  isActive: active
                }
              }, {
                model: _User["default"],
                attributes: ['userID', 'nick', 'email', 'status']
              }],
              limit: limit,
              offset: from
            });

          case 7:
            examRegisters = _context5.sent;

            if (!(examRegisters.count > 0)) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              examRegisters: examRegisters
            }));

          case 12:
            (0, _errors.returnNotFound)(res, 'Student ID');

          case 13:
            _context5.next = 19;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](4);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Exam Registers by Student');

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 15]]);
  }));
  return _getExamRegistersByStudentActiveExam.apply(this, arguments);
}

function getExamRegistersByAllExams(_x11, _x12) {
  return _getExamRegistersByAllExams.apply(this, arguments);
} // Get all Exam Registers by Active Exam


function _getExamRegistersByAllExams() {
  _getExamRegistersByAllExams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var examID, limit, from, examRegisters;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            examID = req.params.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context6.prev = 3;
            _context6.next = 6;
            return _ExamRegister["default"].findAndCountAll({
              attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
              where: {
                examID: examID
              },
              include: [{
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Exam["default"],
                attributes: ['examID', 'startDate', 'endDate', 'topic']
              }, {
                model: _User["default"],
                attributes: ['userID', 'nick', 'email', 'status']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examRegisters = _context6.sent;

            if (!(examRegisters.count > 0)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              examRegisters: examRegisters
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 12:
            _context6.next = 18;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](3);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Exam Registers by all Exam ID');

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 14]]);
  }));
  return _getExamRegistersByAllExams.apply(this, arguments);
}

function getExamRegistersByActiveExams(_x13, _x14) {
  return _getExamRegistersByActiveExams.apply(this, arguments);
} // Get all Eam Registers by Subject


function _getExamRegistersByActiveExams() {
  _getExamRegistersByActiveExams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var examID, limit, from, active, examRegisters;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            examID = req.params.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context7.prev = 4;
            _context7.next = 7;
            return _ExamRegister["default"].findAndCountAll({
              attributes: ['registerID', 'registeredDate', 'userID', 'status', 'status', 'reviewNumber', 'isReviewed', 'lastStatus', 'lastStatusUser', 'lastStatusDate', 'reviewDetail', 'generalDetail', 'isRegistered', 'studentID', 'userID', 'examID'],
              where: {
                examID: examID
              },
              include: [{
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _Exam["default"],
                attributes: ['examID', 'startDate', 'endDate', 'topic'],
                where: {
                  isActive: active
                }
              }, {
                model: _User["default"],
                attributes: ['userID', 'nick', 'email', 'status']
              }],
              limit: limit,
              offset: from
            });

          case 7:
            examRegisters = _context7.sent;

            if (!(examRegisters.count > 0)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              examRegisters: examRegisters
            }));

          case 12:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 13:
            _context7.next = 19;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](4);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Get Exam Registers by all Exam ID');

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 15]]);
  }));
  return _getExamRegistersByActiveExams.apply(this, arguments);
}

function getExamRegisterBySubject(_x15, _x16) {
  return _getExamRegisterBySubject.apply(this, arguments);
} // Update an Exam Register


function _getExamRegisterBySubject() {
  _getExamRegisterBySubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var subjectID, limit, from, active, activeQuery, counter, total, examRegisters;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            subjectID = req.params.subjectID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active;

            if (active === undefined || active === null) {
              activeQuery = '';
            } else {
              activeQuery = "AND su.\"isActive\" = ".concat(active);
            }

            console.log('activeQuery', activeQuery);
            _context8.prev = 6;
            _context8.next = 9;
            return _database.sequelize.query("\n            SELECT\tCOUNT(*)\n                FROM \t\"examRegister\" er, \n                        \"student\" st, \n                        \"exam\" ex, \n                        \"user\" us, \n                        \"person\" pe, \n                        \"subject\" su\n                WHERE er.\"studentID\" = st.\"studentID\"\n                    AND er.\"examID\" = ex.\"examID\"\n                    AND er.\"userID\" = us.\"userID\"\n                    AND st.\"personID\" = pe.\"personID\"\n                    AND ex.\"subjectID\" = su.\"subjectID\"\n                    AND su.\"subjectID\" = ".concat(subjectID, "\n                    ").concat(activeQuery, ";\n        "));

          case 9:
            counter = _context8.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context8.next = 22;
              break;
            }

            _context8.next = 14;
            return _database.sequelize.query("\n                SELECT\ter.\"registerID\" IDRegister,\n                        er.\"registeredDate\" dateRegister,\n                        er.\"status\" status,\n                        er.\"reviewNumber\" numReview,\n                        er.\"isReviewed\" reviewed,\n                        er.\"lastStatus\" previousStatus,\n                        er.\"lastStatusDate\" previousDate,\n                        er.\"lastStatusUser\" previousUser,\n                        er.\"reviewDetail\" detailRev,\n                        er.\"generalDetail\" detailGen,\n                        er.\"isRegistered\" registerd,\n                        er.\"studentID\" idStudent,\n                        st.\"studentCode\" code,\n                        pe.\"personID\" idPerson,\n                        pe.\"completeName\" namecomplete,\n                        ex.\"examID\" idExam,\n                        ex.\"startDate\" dateStart,\n                        ex.\"endDate\" dateEnd,\n                        ex.\"topic\" theme,\n                        us.\"nick\" nickname,\n                        us.\"email\" mail,\n                        us.\"status\" status,\n                        su.\"subjectName\" subject,\n                        su.\"description\" subjectDescription\n                FROM \"examRegister\" er, \"student\" st, \"exam\" ex, \"user\" us, \"person\" pe, \"subject\" su\n                WHERE er.\"studentID\" = st.\"studentID\"\n                    AND er.\"examID\" = ex.\"examID\"\n                    AND er.\"userID\" = us.\"userID\"\n                    AND st.\"personID\" = pe.\"personID\"\n                    AND ex.\"subjectID\" = su.\"subjectID\"\n                    AND su.\"subjectID\" = ".concat(subjectID, "\n                    ").concat(activeQuery, "\n                    ORDER BY pe.\"lastNames\" ASC\n                    LIMIT ").concat(limit, "\n                    OFFSET ").concat(from, ";\n            "));

          case 14:
            examRegisters = _context8.sent;

            if (!examRegisters) {
              _context8.next = 19;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              examRegisters: examRegisters[0],
              count: total
            }));

          case 19:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 20:
            _context8.next = 23;
            break;

          case 22:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 23:
            _context8.next = 29;
            break;

          case 25:
            _context8.prev = 25;
            _context8.t0 = _context8["catch"](6);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Get Exam Register by Subject');

          case 29:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[6, 25]]);
  }));
  return _getExamRegisterBySubject.apply(this, arguments);
}

function updateExamRegister(_x17, _x18) {
  return _updateExamRegister.apply(this, arguments);
} // Review an Exam Register


function _updateExamRegister() {
  _updateExamRegister = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var registerID, _req$body2, generalDetail, status, studentID, examID, userID, dbExamRegister, number, dateOfRegister, actualStatus, actualUser, updatedExamRegister;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            registerID = req.params.registerID;
            _req$body2 = req.body, generalDetail = _req$body2.generalDetail, status = _req$body2.status, studentID = _req$body2.studentID, examID = _req$body2.examID, userID = _req$body2.userID;
            _context9.prev = 2;
            _context9.next = 5;
            return _ExamRegister["default"].findOne({
              attributes: ['registerID', 'registeredDate', 'status', 'reviewNumber', 'userID'],
              where: {
                registerID: registerID
              }
            });

          case 5:
            dbExamRegister = _context9.sent;
            number = dbExamRegister.dataValues.reviewNumber;
            dateOfRegister = dbExamRegister.dataValues.registeredDate;
            actualStatus = dbExamRegister.dataValues.status;
            actualUser = dbExamRegister.dataValues.userID;
            console.log('Actual number', number);
            console.log('New number', number + 1);

            if (!(dbExamRegister === undefined || dbExamRegister === null)) {
              _context9.next = 16;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam Register ID');
            _context9.next = 24;
            break;

          case 16:
            _context9.next = 18;
            return _ExamRegister["default"].update({
              generalDetail: generalDetail,
              status: status,
              studentID: studentID,
              examID: examID,
              userID: userID,
              reviewNumber: number + 1,
              lastStatus: actualStatus,
              lastStatusDate: dateOfRegister,
              lastStatusUser: actualUser,
              registeredDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                registerID: registerID
              }
            });

          case 18:
            updatedExamRegister = _context9.sent;

            if (!updatedExamRegister) {
              _context9.next = 23;
              break;
            }

            return _context9.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Register updated successfully'
            }));

          case 23:
            (0, _errors.returnNotFound)(res, 'Exam Register ID');

          case 24:
            _context9.next = 30;
            break;

          case 26:
            _context9.prev = 26;
            _context9.t0 = _context9["catch"](2);
            console.log('Error:', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Update Exam Register');

          case 30:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 26]]);
  }));
  return _updateExamRegister.apply(this, arguments);
}

function reviewExamRegister(_x19, _x20) {
  return _reviewExamRegister.apply(this, arguments);
} // Register an Exam Register


function _reviewExamRegister() {
  _reviewExamRegister = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var registerID, _req$body3, reviewDetail, userID, dbExamRegister, number, dateOfRegister, actualStatus, actualUser, _reviewExamRegister2;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            registerID = req.params.registerID;
            _req$body3 = req.body, reviewDetail = _req$body3.reviewDetail, userID = _req$body3.userID;
            _context10.prev = 2;
            _context10.next = 5;
            return _ExamRegister["default"].findOne({
              attributes: ['registerID', 'registeredDate', 'status', 'reviewNumber', 'userID'],
              where: {
                registerID: registerID
              }
            });

          case 5:
            dbExamRegister = _context10.sent;
            number = dbExamRegister.dataValues.reviewNumber;
            dateOfRegister = dbExamRegister.dataValues.registeredDate;
            actualStatus = dbExamRegister.dataValues.status;
            actualUser = dbExamRegister.dataValues.userID;

            if (!(dbExamRegister === undefined || dbExamRegister === null)) {
              _context10.next = 14;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam Register ID');
            _context10.next = 22;
            break;

          case 14:
            _context10.next = 16;
            return _ExamRegister["default"].update({
              reviewDetail: reviewDetail,
              status: 2,
              userID: userID,
              reviewNumber: number + 1,
              lastStatus: actualStatus,
              lastStatusDate: dateOfRegister,
              lastStatusUser: actualUser,
              registeredDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              isReviewed: true
            }, {
              where: {
                registerID: registerID
              }
            });

          case 16:
            _reviewExamRegister2 = _context10.sent;

            if (!_reviewExamRegister2) {
              _context10.next = 21;
              break;
            }

            return _context10.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Register reviewed successfully'
            }));

          case 21:
            (0, _errors.returnNotFound)(res, 'Exam Register ID');

          case 22:
            _context10.next = 28;
            break;

          case 24:
            _context10.prev = 24;
            _context10.t0 = _context10["catch"](2);
            console.log('Error:', _context10.t0);
            (0, _errors.returnError)(res, _context10.t0, 'Review Exam Register');

          case 28:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 24]]);
  }));
  return _reviewExamRegister.apply(this, arguments);
}

function registerExamRegister(_x21, _x22) {
  return _registerExamRegister.apply(this, arguments);
} // Delete an Exam Register


function _registerExamRegister() {
  _registerExamRegister = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var registerID, userID, dbExamRegister, number, dateOfRegister, actualStatus, actualUser, _registerExamRegister2;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            registerID = req.params.registerID;
            userID = req.body.userID;
            _context11.prev = 2;
            _context11.next = 5;
            return _ExamRegister["default"].findOne({
              attributes: ['registerID', 'registeredDate', 'status', 'reviewNumber', 'userID'],
              where: {
                registerID: registerID
              }
            });

          case 5:
            dbExamRegister = _context11.sent;
            number = dbExamRegister.dataValues.reviewNumber;
            dateOfRegister = dbExamRegister.dataValues.registeredDate;
            actualStatus = dbExamRegister.dataValues.status;
            actualUser = dbExamRegister.dataValues.userID;

            if (!(dbExamRegister === undefined || dbExamRegister === null)) {
              _context11.next = 14;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam Register ID');
            _context11.next = 22;
            break;

          case 14:
            _context11.next = 16;
            return _ExamRegister["default"].update({
              status: 6,
              userID: userID,
              reviewNumber: number + 1,
              lastStatus: actualStatus,
              lastStatusDate: dateOfRegister,
              lastStatusUser: actualUser,
              registeredDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              isRegistered: true
            }, {
              where: {
                registerID: registerID
              }
            });

          case 16:
            _registerExamRegister2 = _context11.sent;

            if (!_registerExamRegister2) {
              _context11.next = 21;
              break;
            }

            return _context11.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Register registered successfully'
            }));

          case 21:
            (0, _errors.returnNotFound)(res, 'Exam Register ID');

          case 22:
            _context11.next = 28;
            break;

          case 24:
            _context11.prev = 24;
            _context11.t0 = _context11["catch"](2);
            console.log('Error:', _context11.t0);
            (0, _errors.returnError)(res, _context11.t0, 'Register Exam Register');

          case 28:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 24]]);
  }));
  return _registerExamRegister.apply(this, arguments);
}

function deleteExamRegister(_x23, _x24) {
  return _deleteExamRegister.apply(this, arguments);
}

function _deleteExamRegister() {
  _deleteExamRegister = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var registerID, countDeleted;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            registerID = req.params.registerID;
            _context12.prev = 1;
            _context12.next = 4;
            return _ExamRegister["default"].destroy({
              where: {
                registerID: registerID
              }
            });

          case 4:
            countDeleted = _context12.sent;

            if (!(countDeleted > 0)) {
              _context12.next = 9;
              break;
            }

            return _context12.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Register deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Register ID');

          case 10:
            _context12.next = 16;
            break;

          case 12:
            _context12.prev = 12;
            _context12.t0 = _context12["catch"](1);
            console.log('Error:', _context12.t0);
            (0, _errors.returnError)(res, _context12.t0, 'Delete Exam Register');

          case 16:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 12]]);
  }));
  return _deleteExamRegister.apply(this, arguments);
}