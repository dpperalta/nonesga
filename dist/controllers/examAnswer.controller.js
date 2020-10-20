"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExamAnswer = createExamAnswer;
exports.getExamAnswers = getExamAnswers;
exports.getExamAnswerByID = getExamAnswerByID;
exports.getExamAnswerByQuestion = getExamAnswerByQuestion;
exports.getExamAnswerByExam = getExamAnswerByExam;
exports.updateAnswer = updateAnswer;
exports.changeActivationExamAnswer = changeActivationExamAnswer;
exports.deleteExamAnswer = deleteExamAnswer;

var _ExamAnswer = _interopRequireDefault(require("../models/ExamAnswer"));

var _ExamQuestion = _interopRequireDefault(require("../models/ExamQuestion"));

var _Exam = _interopRequireDefault(require("../models/Exam"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Exam Answer
function createExamAnswer(_x, _x2) {
  return _createExamAnswer.apply(this, arguments);
} // Get all Exam Answers


function _createExamAnswer() {
  _createExamAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, answer, grade, homologatedGrade, isCorrect, detail, questionID, newExamAnswer;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, answer = _req$body.answer, grade = _req$body.grade, homologatedGrade = _req$body.homologatedGrade, isCorrect = _req$body.isCorrect, detail = _req$body.detail, questionID = _req$body.questionID;
            _context.prev = 1;
            _context.next = 4;
            return _ExamAnswer["default"].create({
              answer: answer,
              grade: grade,
              homologatedGrade: homologatedGrade,
              isCorrect: isCorrect,
              status: 2,
              // Status 2 is draft, when the teacher finishes creation update to status 1
              detail: detail,
              questionID: questionID
            }, {
              fields: ['answer', 'grade', 'homologatedGrade', 'isCorrect', 'status', 'detail', 'questionID'],
              returning: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID']
            });

          case 4:
            newExamAnswer = _context.sent;

            if (!newExamAnswer) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Answer created successfully',
              examAnswer: newExamAnswer
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Exam Answer');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createExamAnswer.apply(this, arguments);
}

function getExamAnswers(_x3, _x4) {
  return _getExamAnswers.apply(this, arguments);
} // Get an Exam Asnwer by ID


function _getExamAnswers() {
  _getExamAnswers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, examAnswers;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _ExamAnswer["default"].findAndCountAll({
              attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID'],
              include: [{
                model: _ExamQuestion["default"],
                attributes: ['questionID', 'question', 'minGrade', 'maxGrade'],
                include: [{
                  model: _Exam["default"],
                  attributes: ['examID', 'topic', 'startDate', 'endDate']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 5:
            examAnswers = _context2.sent;

            if (!(examAnswers.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              examAnswers: examAnswers
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Exam Answer');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Exam Answers');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getExamAnswers.apply(this, arguments);
}

function getExamAnswerByID(_x5, _x6) {
  return _getExamAnswerByID.apply(this, arguments);
} // Get all answers for an question


function _getExamAnswerByID() {
  _getExamAnswerByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var answerID, examAnswer;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            answerID = req.params.answerID;
            _context3.prev = 1;
            _context3.next = 4;
            return _ExamAnswer["default"].findOne({
              attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID'],
              where: {
                answerID: answerID
              },
              include: [{
                model: _ExamQuestion["default"],
                attributes: ['questionID', 'question', 'minGrade', 'maxGrade'],
                include: [{
                  model: _Exam["default"],
                  attributes: ['examID', 'topic', 'startDate', 'endDate']
                }]
              }]
            });

          case 4:
            examAnswer = _context3.sent;

            if (!examAnswer) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              examAnswer: examAnswer
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Answer ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Exam Answer by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getExamAnswerByID.apply(this, arguments);
}

function getExamAnswerByQuestion(_x7, _x8) {
  return _getExamAnswerByQuestion.apply(this, arguments);
} // Get all answers for an exam


function _getExamAnswerByQuestion() {
  _getExamAnswerByQuestion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var questionID, limit, from, examAnswers;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            questionID = req.params.questionID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _ExamAnswer["default"].findAndCountAll({
              attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'isCorrect', 'registeredDate', 'unregisteredDate', 'isActive', 'status', 'detail', 'questionID'],
              where: {
                questionID: questionID
              },
              include: [{
                model: _ExamQuestion["default"],
                attributes: ['questionID', 'question', 'minGrade', 'maxGrade'],
                include: [{
                  model: _Exam["default"],
                  attributes: ['examID', 'topic', 'startDate', 'endDate']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 6:
            examAnswers = _context4.sent;

            if (!examAnswers) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              examAnswers: examAnswers
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Exam Question ID');

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Exam Answers by Question');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getExamAnswerByQuestion.apply(this, arguments);
}

function getExamAnswerByExam(_x9, _x10) {
  return _getExamAnswerByExam.apply(this, arguments);
} // Update an Exam Answer


function _getExamAnswerByExam() {
  _getExamAnswerByExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var examID, limit, from, correct, correctQuery, counter, total, examAnswers;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            examID = req.params.examID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            correct = req.query.correct;

            if (correct === undefined || correct === null) {
              correctQuery = '';
            } else {
              correctQuery = "AND ea.\"isCorrect\" = ".concat(correct);
            }

            _context5.prev = 5;
            _context5.next = 8;
            return _database.sequelize.query("\n            SELECT COUNT (*)\n            FROM \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex\n            WHERE \tea.\"questionID\" = eq.\"questionID\"\n                AND\teq.\"examID\" = ex.\"examID\"\n                AND ex.\"examID\" = ".concat(examID, "\n                ").concat(correctQuery, "\n        "));

          case 8:
            counter = _context5.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context5.next = 22;
              break;
            }

            _context5.next = 13;
            return _database.sequelize.query("\n                SELECT \tea.\"answerID\" idAnswer,\n                        ea.\"answer\" answer,\n                        ea.\"grade\" grade,\n                        ea.\"homologatedGrade\" homologated,\n                        ea.\"isCorrect\" correct,\n                        ea.\"registeredDate\" registerm,\n                        ea.\"unregisteredDate\" unregister,\n                        ea.\"status\" status,\n                        ea.\"detail\" details,\n                        eq.\"question\" question,\n                        eq.\"minGrade\" minimunGrade,\n                        eq.\"maxGrade\" maximunGrade,\n                        ex.\"topic\" theme,\n                        ex.\"startDate\" dateOfStart,\n                        ex.\"endDate\" dateOfEnd\n                FROM \"examAnswer\" ea, \"examQuestion\" eq, \"exam\" ex\n                WHERE \tea.\"questionID\" = eq.\"questionID\"\n                    AND\teq.\"examID\" = ex.\"examID\"\n                    AND ex.\"examID\" = ".concat(examID, "\n                    ").concat(correctQuery, "\n                    ORDER BY eq.\"questionID\"\n                    LIMIT ").concat(limit, "\n                    OFFSET ").concat(from, "\n            "));

          case 13:
            examAnswers = _context5.sent;

            if (!examAnswers) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              answers: examAnswers[0],
              count: total
            }));

          case 18:
            (0, _errors.returnNotFound)(res, 'Exam ID');
            return _context5.abrupt("return");

          case 20:
            _context5.next = 23;
            break;

          case 22:
            (0, _errors.returnNotFound)(res, 'Exam ID');

          case 23:
            _context5.next = 29;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t0 = _context5["catch"](5);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Exam Answers by Question');

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 25]]);
  }));
  return _getExamAnswerByExam.apply(this, arguments);
}

function updateAnswer(_x11, _x12) {
  return _updateAnswer.apply(this, arguments);
} // Change activation status of an Exam Answer


function _updateAnswer() {
  _updateAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var answerID, _req$body2, answer, grade, homologatedGrade, status, isCorrect, detail, questionID, dbExamAnswer, updatedExamAnswer;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            answerID = req.params.answerID;
            _req$body2 = req.body, answer = _req$body2.answer, grade = _req$body2.grade, homologatedGrade = _req$body2.homologatedGrade, status = _req$body2.status, isCorrect = _req$body2.isCorrect, detail = _req$body2.detail, questionID = _req$body2.questionID;
            _context6.prev = 2;
            _context6.next = 5;
            return _ExamAnswer["default"].findOne({
              attributes: ['answerID', 'answer', 'grade', 'homologatedGrade', 'status', 'isCorrect', 'detail'],
              where: {
                answerID: answerID
              }
            });

          case 5:
            dbExamAnswer = _context6.sent;

            if (!(dbExamAnswer === null || dbExamAnswer === undefined)) {
              _context6.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Exam Answer ID');
            _context6.next = 18;
            break;

          case 10:
            _context6.next = 12;
            return _ExamAnswer["default"].update({
              answer: answer,
              grade: grade,
              homologatedGrade: homologatedGrade,
              status: status,
              isCorrect: isCorrect,
              detail: detail,
              questionID: questionID
            }, {
              where: {
                answerID: answerID
              }
            });

          case 12:
            updatedExamAnswer = _context6.sent;

            if (!updatedExamAnswer) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Exam Answer updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Exam Answer ID');

          case 18:
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Update Exam Answer');

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 20]]);
  }));
  return _updateAnswer.apply(this, arguments);
}

function changeActivationExamAnswer(_x13, _x14) {
  return _changeActivationExamAnswer.apply(this, arguments);
} // Delete an Exam Answer


function _changeActivationExamAnswer() {
  _changeActivationExamAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var answerID, type, value, action, afirmation, negation, changeActivationJSON, dbExamAnswer, changeActivation;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            answerID = req.params.answerID;
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
                (0, _errors.returnWrongError)(res, 'type', 'request');
              }
            }

            _context7.prev = 6;
            _context7.next = 9;
            return _ExamAnswer["default"].findOne({
              attributes: ['answerID', 'registeredDate', 'unregisteredDate', 'isActive'],
              where: {
                answerID: answerID
              }
            });

          case 9:
            dbExamAnswer = _context7.sent;

            if (!dbExamAnswer) {
              _context7.next = 21;
              break;
            }

            _context7.next = 13;
            return _ExamAnswer["default"].update(changeActivationJSON, {
              where: {
                answerID: answerID,
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
              message: 'Exam Answer ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context7.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Exam Answer or Exam Answer alread ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context7.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Exam Answer ID');

          case 22:
            _context7.next = 28;
            break;

          case 24:
            _context7.prev = 24;
            _context7.t0 = _context7["catch"](6);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Change Activation Exam Answer');

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[6, 24]]);
  }));
  return _changeActivationExamAnswer.apply(this, arguments);
}

function deleteExamAnswer(_x15, _x16) {
  return _deleteExamAnswer.apply(this, arguments);
}

function _deleteExamAnswer() {
  _deleteExamAnswer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var answerID, countDeleted;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            answerID = req.params.answerID;
            _context8.prev = 1;
            _context8.next = 4;
            return _ExamAnswer["default"].destroy({
              where: {
                answerID: answerID
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
              message: 'Exam Answer deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Exam Answer ID');

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Delete Exam Answer');

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));
  return _deleteExamAnswer.apply(this, arguments);
}