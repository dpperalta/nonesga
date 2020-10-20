"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskEvaluation = createTaskEvaluation;
exports.getTaskEvaluations = getTaskEvaluations;
exports.getTaskEvaluationByID = getTaskEvaluationByID;
exports.getTaskEvaluationsByTask = getTaskEvaluationsByTask;
exports.updateTaskEvaluation = updateTaskEvaluation;
exports.updateTaskEvaluationStudent = updateTaskEvaluationStudent;
exports.changeActivationTaskEvaluation = changeActivationTaskEvaluation;
exports.deleteTaskEvaluation = deleteTaskEvaluation;

var _TaskEvaluation = _interopRequireDefault(require("../models/TaskEvaluation"));

var _Task = _interopRequireDefault(require("../models/Task"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _errors = require("./errors");

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Task Evaluation
function createTaskEvaluation(_x, _x2) {
  return _createTaskEvaluation.apply(this, arguments);
} // Get all task evaluations


function _createTaskEvaluation() {
  _createTaskEvaluation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, taskScore, taskEvaluationDate, taskID, studentID, homologation, newTaskEvaluation;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, taskScore = _req$body.taskScore, taskEvaluationDate = _req$body.taskEvaluationDate, taskID = _req$body.taskID, studentID = _req$body.studentID;
            homologation = taskScoreHomologation(taskScore);

            if (!(homologation === 'Error')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Homologation values error, please validate'
            }));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _TaskEvaluation["default"].create({
              taskScore: taskScore,
              scoreHomologation: homologation,
              taskEvaluationDate: taskEvaluationDate,
              taskID: taskID,
              studentID: studentID
            }, {
              fields: ['taskScore', 'scoreHomologation', 'taskEvaluationDate', 'taskID', 'studentID'],
              returning: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID']
            });

          case 7:
            newTaskEvaluation = _context.sent;

            if (!newTaskEvaluation) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Evaluation created successfully',
              taskEvaluation: newTaskEvaluation
            }));

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Task Evaluation');

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12]]);
  }));
  return _createTaskEvaluation.apply(this, arguments);
}

function getTaskEvaluations(_x3, _x4) {
  return _getTaskEvaluations.apply(this, arguments);
} // Get a Task Evaluation by ID


function _getTaskEvaluations() {
  _getTaskEvaluations = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, active, taskEvaluations;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context2.prev = 3;
            _context2.next = 6;
            return _TaskEvaluation["default"].findAndCountAll({
              attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
              where: {
                isActive: active
              },
              include: [{
                model: _Task["default"],
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'dni', 'completeName']
                }]
              }]
            });

          case 6:
            taskEvaluations = _context2.sent;

            if (!(taskEvaluations.count > 0)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              taskEvaluations: taskEvaluations
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Any Task Evaluation');

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Task Evaluations');

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return _getTaskEvaluations.apply(this, arguments);
}

function getTaskEvaluationByID(_x5, _x6) {
  return _getTaskEvaluationByID.apply(this, arguments);
} // Get task evaluations by task


function _getTaskEvaluationByID() {
  _getTaskEvaluationByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var taskEvaluationID, taskEvaluation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            taskEvaluationID = req.params.taskEvaluationID;
            _context3.prev = 1;
            _context3.next = 4;
            return _TaskEvaluation["default"].findOne({
              attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
              where: {
                taskEvaluationID: taskEvaluationID
              },
              include: [{
                model: _Task["default"],
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'dni', 'completeName']
                }]
              }]
            });

          case 4:
            taskEvaluation = _context3.sent;

            if (!taskEvaluation) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              taskEvaluation: taskEvaluation
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Evaluation ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Task Evaluation by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getTaskEvaluationByID.apply(this, arguments);
}

function getTaskEvaluationsByTask(_x7, _x8) {
  return _getTaskEvaluationsByTask.apply(this, arguments);
} // Update a task evaluation for teacher or admin


function _getTaskEvaluationsByTask() {
  _getTaskEvaluationsByTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var taskID, active, taskEvaluations;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            taskID = req.params.taskID;
            active = req.query.active || true;
            _context4.prev = 2;
            _context4.next = 5;
            return _TaskEvaluation["default"].findAndCountAll({
              attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregistered', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
              where: {
                taskID: taskID,
                isActive: active
              },
              include: [{
                model: _Task["default"],
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'studentCode'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'dni', 'completeName']
                }]
              }]
            });

          case 5:
            taskEvaluations = _context4.sent;

            if (!(taskEvaluations.count > 0)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              taskEvaluations: taskEvaluations
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Task ID');

          case 11:
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Task Evaluation by Task');

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return _getTaskEvaluationsByTask.apply(this, arguments);
}

function updateTaskEvaluation(_x9, _x10) {
  return _updateTaskEvaluation.apply(this, arguments);
} // Update a task evaluation for student or agent


function _updateTaskEvaluation() {
  _updateTaskEvaluation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var taskEvaluationID, _req$body2, taskScore, scoreHomologation, taskEvaluationDate, taskID, studentID, homologation, dbTaskEvaluation, updatedTaskEvaluation;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            taskEvaluationID = req.params.taskEvaluationID;
            _req$body2 = req.body, taskScore = _req$body2.taskScore, scoreHomologation = _req$body2.scoreHomologation, taskEvaluationDate = _req$body2.taskEvaluationDate, taskID = _req$body2.taskID, studentID = _req$body2.studentID;
            _context5.prev = 2;
            _context5.next = 5;
            return _TaskEvaluation["default"].findOne({
              attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
              where: {
                taskEvaluationID: taskEvaluationID
              }
            });

          case 5:
            dbTaskEvaluation = _context5.sent;

            if (!(dbTaskEvaluation === null || dbTaskEvaluation === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Task Evaluation ID');
            _context5.next = 22;
            break;

          case 10:
            if (!(taskScore !== undefined || taskScore !== null)) {
              _context5.next = 14;
              break;
            }

            homologation = taskScoreHomologation(taskScore);

            if (!(homologation === 'Error')) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Homologation values error, please validate'
            }));

          case 14:
            _context5.next = 16;
            return _TaskEvaluation["default"].update({
              taskScore: taskScore,
              scoreHomologation: homologation,
              taskEvaluationDate: taskEvaluationDate,
              //studentDetail,
              //agentDetail,
              taskID: taskID,
              studentID: studentID
            }, {
              where: {
                taskEvaluationID: taskEvaluationID
              }
            });

          case 16:
            updatedTaskEvaluation = _context5.sent;

            if (!updatedTaskEvaluation) {
              _context5.next = 21;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Taske Evaluation updated successfully'
            }));

          case 21:
            (0, _errors.returnNotFound)(res, 'Task Evaluation ID - not updated');

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Task Evaluation');

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 24]]);
  }));
  return _updateTaskEvaluation.apply(this, arguments);
}

function updateTaskEvaluationStudent(_x11, _x12) {
  return _updateTaskEvaluationStudent.apply(this, arguments);
} // Change activation status to a task evaluation


function _updateTaskEvaluationStudent() {
  _updateTaskEvaluationStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var taskEvaluationID, _req$body3, studentDetail, agentDetail, dbTaskEvaluation, udpatedTaskEvaluation;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            taskEvaluationID = req.params.taskEvaluationID;
            _req$body3 = req.body, studentDetail = _req$body3.studentDetail, agentDetail = _req$body3.agentDetail;
            _context6.prev = 2;
            _context6.next = 5;
            return _TaskEvaluation["default"].findOne({
              attributes: ['taskEvaluationID', 'taskScore', 'scoreHomologation', 'registeredDate', 'unregisteredDate', 'taskEvaluationDate', 'studentDetail', 'isActive', 'agentDetail', 'taskID', 'studentID'],
              where: {
                taskEvaluationID: taskEvaluationID
              }
            });

          case 5:
            dbTaskEvaluation = _context6.sent;

            if (!(dbTaskEvaluation === null || dbTaskEvaluation === undefined)) {
              _context6.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Task Evaluation ID');
            _context6.next = 18;
            break;

          case 10:
            _context6.next = 12;
            return _TaskEvaluation["default"].update({
              studentDetail: studentDetail,
              agentDetail: agentDetail
            }, {
              where: {
                taskEvaluationID: taskEvaluationID
              }
            });

          case 12:
            udpatedTaskEvaluation = _context6.sent;

            if (!udpatedTaskEvaluation) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Evaluation updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Task Evaluation ID');

          case 18:
            _context6.next = 24;
            break;

          case 20:
            _context6.prev = 20;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Update Task Evaluation for Student or Agent');

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 20]]);
  }));
  return _updateTaskEvaluationStudent.apply(this, arguments);
}

function changeActivationTaskEvaluation(_x13, _x14) {
  return _changeActivationTaskEvaluation.apply(this, arguments);
} // Delete a task evaluation


function _changeActivationTaskEvaluation() {
  _changeActivationTaskEvaluation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var taskEvaluationID, type, value, action, afirmation, negation, changeActivationJSON, dbTaskEvaluation, changeActivation;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            taskEvaluationID = req.params.taskEvaluationID;
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
            return _TaskEvaluation["default"].findOne({
              attributes: ['taskEvaluationID', 'taskScore', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
              where: {
                taskEvaluationID: taskEvaluationID
              }
            });

          case 9:
            dbTaskEvaluation = _context7.sent;

            if (!dbTaskEvaluation) {
              _context7.next = 21;
              break;
            }

            _context7.next = 13;
            return _TaskEvaluation["default"].update(changeActivationJSON, {
              where: {
                taskEvaluationID: taskEvaluationID,
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
              message: 'Task Evaluation ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context7.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Task Evaluation or Task Evaluation already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context7.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Task Evaluation ID');

          case 22:
            _context7.next = 28;
            break;

          case 24:
            _context7.prev = 24;
            _context7.t0 = _context7["catch"](6);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Change Activation Task Evaluation');

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[6, 24]]);
  }));
  return _changeActivationTaskEvaluation.apply(this, arguments);
}

function deleteTaskEvaluation(_x15, _x16) {
  return _deleteTaskEvaluation.apply(this, arguments);
}

function _deleteTaskEvaluation() {
  _deleteTaskEvaluation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var taskEvaluationID, countDeleted;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            taskEvaluationID = req.params.taskEvaluationID;
            _context8.prev = 1;
            _context8.next = 4;
            return _TaskEvaluation["default"].destroy({
              where: {
                taskEvaluationID: taskEvaluationID
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
              message: 'Task Evaluation deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Evaluation ID');

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Delete Task Evaluation');

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));
  return _deleteTaskEvaluation.apply(this, arguments);
}

function taskScoreHomologation(score) {
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