"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskResolution = createTaskResolution;
exports.getTaskResolutions = getTaskResolutions;
exports.getTaskResolutionByID = getTaskResolutionByID;
exports.getTaskResolutionByTask = getTaskResolutionByTask;
exports.updateTaskResolution = updateTaskResolution;
exports.changeActivationTaskResolution = changeActivationTaskResolution;
exports.deleteTaskResolution = deleteTaskResolution;

var _TaskResolution = _interopRequireDefault(require("../models/TaskResolution"));

var _Task = _interopRequireDefault(require("../models/Task"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create new Task Resolution
function createTaskResolution(_x, _x2) {
  return _createTaskResolution.apply(this, arguments);
} // Get all task resolutions


function _createTaskResolution() {
  _createTaskResolution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, detail, isPublished, taskID, studentID, newTaskResolution;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, detail = _req$body.detail, isPublished = _req$body.isPublished, taskID = _req$body.taskID, studentID = _req$body.studentID;
            _context.prev = 1;
            _context.next = 4;
            return _TaskResolution["default"].create({
              detail: detail,
              isPublished: isPublished,
              updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              publishedDate: isPublished ? _database.sequelize.literal('CURRENT_TIMESTAMP') : null,
              taskID: taskID,
              studentID: studentID
            }, {
              fields: ['detail', 'isPublished', 'updatedDate', 'publishedDate', 'taskID', 'studentID'],
              returning: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'isPublished', 'publishedDate', 'taskID', 'studentID']
            });

          case 4:
            newTaskResolution = _context.sent;

            if (!newTaskResolution) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resolution created successfully',
              taskResolution: newTaskResolution
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Task Resolution');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createTaskResolution.apply(this, arguments);
}

function getTaskResolutions(_x3, _x4) {
  return _getTaskResolutions.apply(this, arguments);
} // Get a Task Resolution by ID


function _getTaskResolutions() {
  _getTaskResolutions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, active, taskResolutions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context2.prev = 3;
            _context2.next = 6;
            return _TaskResolution["default"].findAndCountAll({
              attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'publishedDate', 'isPublished', 'taskID', 'studentID'],
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
              }],
              limit: limit,
              offset: from
            });

          case 6:
            taskResolutions = _context2.sent;

            if (!(taskResolutions.count > 0)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              taskResolutions: taskResolutions
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Any Task Resolution');

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Create Task Resolution');

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return _getTaskResolutions.apply(this, arguments);
}

function getTaskResolutionByID(_x5, _x6) {
  return _getTaskResolutionByID.apply(this, arguments);
} // Get all Task Resolution by Task


function _getTaskResolutionByID() {
  _getTaskResolutionByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var resolutionID, taskResolution;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            resolutionID = req.params.resolutionID;
            _context3.prev = 1;
            _context3.next = 4;
            return _TaskResolution["default"].findOne({
              attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'publishedDate', 'updatedDate', 'isPublished', 'taskID', 'studentID'],
              where: {
                resolutionID: resolutionID
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
            taskResolution = _context3.sent;

            if (!taskResolution) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              taskResolution: taskResolution
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Resolution ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get a Task Resolution by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getTaskResolutionByID.apply(this, arguments);
}

function getTaskResolutionByTask(_x7, _x8) {
  return _getTaskResolutionByTask.apply(this, arguments);
} // Update a task resolution


function _getTaskResolutionByTask() {
  _getTaskResolutionByTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var taskID, active, taskResolutions;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            taskID = req.params.taskID;
            active = req.query.active || true;
            _context4.prev = 2;
            _context4.next = 5;
            return _TaskResolution["default"].findAndCountAll({
              attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'publishedDate', 'updatedDate', 'isPublished', 'taskID', 'studentID'],
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
            taskResolutions = _context4.sent;

            if (!(taskResolutions.count > 0)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              taskResolutions: taskResolutions
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Task Resolution ID');

          case 11:
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Task Resolution by Task');

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return _getTaskResolutionByTask.apply(this, arguments);
}

function updateTaskResolution(_x9, _x10) {
  return _updateTaskResolution.apply(this, arguments);
} // Change activation status to a task Resolution


function _updateTaskResolution() {
  _updateTaskResolution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var resolutionID, _req$body2, detail, isPublished, studentID, dbTaskResolution, updatedTaskResolution;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            resolutionID = req.params.resolutionID;
            _req$body2 = req.body, detail = _req$body2.detail, isPublished = _req$body2.isPublished, studentID = _req$body2.studentID;
            _context5.prev = 2;
            _context5.next = 5;
            return _TaskResolution["default"].findOne({
              attributes: ['resolutionID', 'isActive', 'detail', 'registeredDate', 'unregisteredDate', 'updatedDate', 'publishedDate', 'isPublished', 'taskID', 'studentID'],
              where: {
                resolutionID: resolutionID
              }
            });

          case 5:
            dbTaskResolution = _context5.sent;

            if (!(dbTaskResolution === null || dbTaskResolution === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Task Resolution ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _TaskResolution["default"].update({
              detail: detail,
              isPublished: isPublished,
              studentID: studentID,
              publishedDate: isPublished ? _database.sequelize.literal('CURRENT_TIMESTAMP') : null,
              updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
            }, {
              where: {
                resolutionID: resolutionID
              }
            });

          case 12:
            updatedTaskResolution = _context5.sent;

            if (!updatedTaskResolution) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resolution updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Task Resolution ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Task Resolution');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateTaskResolution.apply(this, arguments);
}

function changeActivationTaskResolution(_x11, _x12) {
  return _changeActivationTaskResolution.apply(this, arguments);
} // Delete a task resolution


function _changeActivationTaskResolution() {
  _changeActivationTaskResolution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var resolutionID, type, value, action, afirmation, negation, changeActivationJSON, dbTaskResolution, changeActivation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            resolutionID = req.params.resolutionID;
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
                unregisteredDate: null,
                updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
              };
            } else {
              if (type.toLowerCase() === 'inactivate') {
                value = false;
                action = 'Inactivating';
                afirmation = 'inactive';
                negation = 'active';
                changeActivationJSON = {
                  isActive: false,
                  unregisteredDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
                  isPublished: false,
                  publishedDate: null,
                  updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
                };
              } else {
                (0, _errors.returnWrongError)(res, 'type', 'request');
              }
            }

            _context6.prev = 6;
            _context6.next = 9;
            return _TaskResolution["default"].findOne({
              attributes: ['resolutionID', 'detail', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID', 'studentID'],
              where: {
                resolutionID: resolutionID
              }
            });

          case 9:
            dbTaskResolution = _context6.sent;

            if (!dbTaskResolution) {
              _context6.next = 21;
              break;
            }

            _context6.next = 13;
            return _TaskResolution["default"].update(changeActivationJSON, {
              where: {
                resolutionID: resolutionID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context6.sent;

            if (!(changeActivation > 0)) {
              _context6.next = 18;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resolution ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Task Resolution or Task Resolution already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context6.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Task Resolution ID');

          case 22:
            _context6.next = 28;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](6);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Change Activation Task Resolution');

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 24]]);
  }));
  return _changeActivationTaskResolution.apply(this, arguments);
}

function deleteTaskResolution(_x13, _x14) {
  return _deleteTaskResolution.apply(this, arguments);
}

function _deleteTaskResolution() {
  _deleteTaskResolution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var resolutionID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            resolutionID = req.params.resolutionID;
            _context7.prev = 1;
            _context7.next = 4;
            return _TaskResolution["default"].destroy({
              where: {
                resolutionID: resolutionID
              }
            });

          case 4:
            countDeleted = _context7.sent;

            if (!(countDeleted > 0)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resolution deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Resolution ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Delete Task Resolution');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deleteTaskResolution.apply(this, arguments);
}