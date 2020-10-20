"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExamQuestion = createExamQuestion;
exports.getExamQuestions = getExamQuestions;
exports.getExamQuestionByID = getExamQuestionByID;
exports.getExamQuestionByExam = getExamQuestionByExam;
exports.getTotalOfExamByID = getTotalOfExamByID;
exports.udpateExamQuestion = udpateExamQuestion;
exports.changeActivationExamQuestion = changeActivationExamQuestion;
exports.deleteExamQuestion = deleteExamQuestion;

var _ExamQuestion = _interopRequireDefault(require("../models/ExamQuestion"));

var _Exam = _interopRequireDefault(require("../models/Exam"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Exam Question
function createExamQuestion(_x, _x2) {
  return _createExamQuestion.apply(this, arguments);
} // Get all Exam Questions


function _createExamQuestion() {
  _createExamQuestion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, question, minGrade, maxGrade, image, examID, newExamQuestion;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, question = _req$body.question, minGrade = _req$body.minGrade, maxGrade = _req$body.maxGrade, image = _req$body.image, examID = _req$body.examID;
            _context.prev = 1;
            _context.next = 4;
            return _ExamQuestion["default"].create({
              question: question,
              minGrade: minGrade,
              maxGrade: maxGrade,
              image: image,
              status: 2,
              examID: examID
            }, {
              fields: ['question', 'minGrade', 'maxGrade', 'image', 'status', 'examID'],
              returning: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID']
            });

          case 4:
            newExamQuestion = _context.sent;

            if (!newExamQuestion) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Question created successfully',
              examQuestion: newExamQuestion
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Exam Question');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createExamQuestion.apply(this, arguments);
}

function getExamQuestions(_x3, _x4) {
  return _getExamQuestions.apply(this, arguments);
} // Get an Exam Question by ID


function _getExamQuestions() {
  _getExamQuestions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, examQuestions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _ExamQuestion["default"].findAndCountAll({
              attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'status', 'isActive', 'unregisteredDate', 'examID'],
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'startHour']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            examQuestions = _context2.sent;

            if (!(examQuestions.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              examQuestions: examQuestions
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Exam Question');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Exam Question');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getExamQuestions.apply(this, arguments);
}

function getExamQuestionByID(_x5, _x6) {
  return _getExamQuestionByID.apply(this, arguments);
} // Get all exam questions of an exam


function _getExamQuestionByID() {
  _getExamQuestionByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var questionID, examQuestion;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            questionID = req.params.questionID;
            _context3.prev = 1;
            _context3.next = 4;
            return _ExamQuestion["default"].findOne({
              attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID'],
              where: {
                questionID: questionID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }]
            });

          case 4:
            examQuestion = _context3.sent;

            if (!examQuestion) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              examQuestion: examQuestion
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Question ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Exam Question by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getExamQuestionByID.apply(this, arguments);
}

function getExamQuestionByExam(_x7, _x8) {
  return _getExamQuestionByExam.apply(this, arguments);
} // Get total of min an max grade from an exam by ID


function _getExamQuestionByExam() {
  _getExamQuestionByExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var examID, limit, from, examQuestions;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            examID = req.params.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _ExamQuestion["default"].findAndCountAll({
              attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID'],
              where: {
                examID: examID
              },
              include: [{
                model: _Exam["default"],
                attributes: ['examID', 'topic', 'startDate', 'endDate']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examQuestions = _context4.sent;

            if (!examQuestions) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              examQuestions: examQuestions
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            console.log('Error: ', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Exam Question by Exam');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getExamQuestionByExam.apply(this, arguments);
}

function getTotalOfExamByID(_x9, _x10) {
  return _getTotalOfExamByID.apply(this, arguments);
} // Update an Exam Question


function _getTotalOfExamByID() {
  _getTotalOfExamByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var examID, totals, responseTotals, totalmaximo, totalminimo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            examID = req.params.examID;
            _context5.prev = 1;
            _context5.next = 4;
            return _database.sequelize.query("\n            SELECT\tSUM(CASE WHEN \"examQuestion\".\"maxGrade\" IS null THEN 0 ELSE \"examQuestion\".\"maxGrade\" END) totalMaximo,\n                    SUM(\"examQuestion\".\"minGrade\") totalMinimo\n            FROM \"examQuestion\"\n            WHERE \"examQuestion\".\"examID\" = ".concat(examID, "\n        "));

          case 4:
            totals = _context5.sent;
            responseTotals = totals[0];
            totalmaximo = responseTotals[0].totalmaximo;
            totalminimo = responseTotals[0].totalminimo;

            if (!totals) {
              _context5.next = 15;
              break;
            }

            if (!(totalmaximo === null && totalminimo === null)) {
              _context5.next = 12;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam ID');
            return _context5.abrupt("return");

          case 12:
            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              totals: totals[0]
            }));

          case 15:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 16:
            _context5.next = 22;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Totals from Exam Question by Exam ID');

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 18]]);
  }));
  return _getTotalOfExamByID.apply(this, arguments);
}

function udpateExamQuestion(_x11, _x12) {
  return _udpateExamQuestion.apply(this, arguments);
} // Change activation status of an Exam Question


function _udpateExamQuestion() {
  _udpateExamQuestion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var questionID, _req$body2, question, minGrade, maxGrade, image, status, examID, dbExamQuestion, updatedExamQuestion;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            questionID = req.params.questionID;
            _req$body2 = req.body, question = _req$body2.question, minGrade = _req$body2.minGrade, maxGrade = _req$body2.maxGrade, image = _req$body2.image, status = _req$body2.status, examID = _req$body2.examID;
            _context6.prev = 2;
            _context6.next = 5;
            return _ExamQuestion["default"].findOne({
              attributes: ['questionID', 'question', 'minGrade', 'maxGrade', 'image', 'registeredDate', 'unregisteredDate', 'status', 'isActive', 'examID'],
              where: {
                questionID: questionID
              }
            });

          case 5:
            dbExamQuestion = _context6.sent;

            if (!(dbExamQuestion === null || dbExamQuestion === undefined)) {
              _context6.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam Question ID');
            _context6.next = 18;
            break;

          case 10:
            _context6.next = 12;
            return _ExamQuestion["default"].update({
              question: question,
              minGrade: minGrade,
              maxGrade: maxGrade,
              image: image,
              status: status,
              examID: examID
            }, {
              where: {
                questionID: questionID
              }
            });

          case 12:
            updatedExamQuestion = _context6.sent;

            if (!updatedExamQuestion) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Question updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Exam Question ID');

          case 18:
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Update Exam Question');

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 20]]);
  }));
  return _udpateExamQuestion.apply(this, arguments);
}

function changeActivationExamQuestion(_x13, _x14) {
  return _changeActivationExamQuestion.apply(this, arguments);
} // Delete an Exam Question


function _changeActivationExamQuestion() {
  _changeActivationExamQuestion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var questionID, type, value, action, afirmation, negation, changeActivationJSON, dbExamQuestion, changeActivation;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            questionID = req.params.questionID;
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

            _context7.prev = 6;
            _context7.next = 9;
            return _ExamQuestion["default"].findOne({
              attributes: ['questionID', 'registeredDate', 'unregisteredDate', 'isActive', 'examID'],
              where: {
                questionID: questionID
              }
            });

          case 9:
            dbExamQuestion = _context7.sent;

            if (!dbExamQuestion) {
              _context7.next = 21;
              break;
            }

            _context7.next = 13;
            return _ExamQuestion["default"].update(changeActivationJSON, {
              where: {
                questionID: questionID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context7.sent;

            if (!(changeActivation > 0)) {
              _context7.next = 18;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Question' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context7.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Exam Question or Exam Question alread ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context7.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Exam Question ID');

          case 22:
            _context7.next = 28;
            break;

          case 24:
            _context7.prev = 24;
            _context7.t0 = _context7["catch"](6);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Change Activation Exam Question');

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[6, 24]]);
  }));
  return _changeActivationExamQuestion.apply(this, arguments);
}

function deleteExamQuestion(_x15, _x16) {
  return _deleteExamQuestion.apply(this, arguments);
}

function _deleteExamQuestion() {
  _deleteExamQuestion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var questionID, countDeleted;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            questionID = req.params.questionID;
            _context8.prev = 1;
            _context8.next = 4;
            return _ExamQuestion["default"].destroy({
              where: {
                questionID: questionID
              }
            });

          case 4:
            countDeleted = _context8.sent;

            if (!(countDeleted > 0)) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Question deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Question ID');

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Delete Exam Question');

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));
  return _deleteExamQuestion.apply(this, arguments);
}