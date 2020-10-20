"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTask = getTask;
exports.getSubjectTasks = getSubjectTasks;
exports.getTaskByStudent = getTaskByStudent;
exports.getTaskByStudentSubject = getTaskByStudentSubject;
exports.updateTask = updateTask;
exports.changeActivationTask = changeActivationTask;
exports.deleteTask = deleteTask;

var _Task = _interopRequireDefault(require("../models/Task"));

var _Subject = _interopRequireDefault(require("../models/Subject"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Crate a new Task
function createTask(_x, _x2) {
  return _createTask.apply(this, arguments);
} // Get all task


function _createTask() {
  _createTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, taskCode, startDate, endDate, taskName, taskDetail, permitsDelay, maxDelay, image, subjectID, newTask;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, taskCode = _req$body.taskCode, startDate = _req$body.startDate, endDate = _req$body.endDate, taskName = _req$body.taskName, taskDetail = _req$body.taskDetail, permitsDelay = _req$body.permitsDelay, maxDelay = _req$body.maxDelay, image = _req$body.image, subjectID = _req$body.subjectID;
            _context.prev = 1;
            _context.next = 4;
            return _Task["default"].create({
              taskCode: taskCode,
              startDate: startDate,
              endDate: endDate,
              taskName: taskName,
              taskDetail: taskDetail,
              permitsDelay: permitsDelay,
              maxDelay: maxDelay,
              image: image,
              subjectID: subjectID
            }, {
              fields: ['taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
              returning: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID']
            });

          case 4:
            newTask = _context.sent;

            if (!newTask) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task created successfully',
              task: newTask
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Task');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createTask.apply(this, arguments);
}

function getTasks(_x3, _x4) {
  return _getTasks.apply(this, arguments);
} // Get a task by task ID


function _getTasks() {
  _getTasks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, tasks;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Task["default"].findAndCountAll({
              attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            tasks = _context2.sent;

            if (!(tasks.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              tasks: tasks
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Tasks');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error: ', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Tasks');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getTasks.apply(this, arguments);
}

function getTask(_x5, _x6) {
  return _getTask.apply(this, arguments);
} // Get a task by subject ID


function _getTask() {
  _getTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var taskID, task;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            taskID = req.params.taskID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Task["default"].findOne({
              attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
              where: {
                taskID: taskID
              },
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }]
            });

          case 4:
            task = _context3.sent;

            if (!task) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              task: task
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Task by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getTask.apply(this, arguments);
}

function getSubjectTasks(_x7, _x8) {
  return _getSubjectTasks.apply(this, arguments);
} // Get task by Student


function _getSubjectTasks() {
  _getSubjectTasks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var subjectID, tasks;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            subjectID = req.params.subjectID;
            _context4.prev = 1;
            _context4.next = 4;
            return _Task["default"].findAndCountAll({
              attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'taskName', 'taskDetail', 'isActive', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
              where: {
                subjectID: subjectID
              },
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }]
            });

          case 4:
            tasks = _context4.sent;

            if (!tasks) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              tasks: tasks
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Subject ID');

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log('Error: ', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Task by Subject');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return _getSubjectTasks.apply(this, arguments);
}

function getTaskByStudent(_x9, _x10) {
  return _getTaskByStudent.apply(this, arguments);
} // Get tasks by Student and Subject


function _getTaskByStudent() {
  _getTaskByStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var studentID, limit, from, active, tasks;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            studentID = req.params.studentID;
            limit = req.query.limit || 100;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context5.prev = 4;
            _context5.next = 7;
            return _database.sequelize.query("\n            SELECT\tta.\"taskCode\" codeTask,\n                    ta.\"startDate\" dateStart,\n                    ta.\"endDate\" dateFinish,\n                    ta.\"taskName\" nameTask,\n                    ta.\"taskDetail\" details,\n                    ta.\"isActive\" active,\n                    ta.\"permitsDelay\" delay,\n                    ta.\"maxDelay\" delayDate,\n                    ta.\"image\" preview,\n                    su.\"subjectCode\" codeSubject,\n                    su.\"subjectName\" nameSubject,\n                    cu.\"courseName\" nameCourse,\n                    cu.\"description\" descriptionCourse,\n                    en.\"enrollmentCode\" enrollment,\n                    st.\"studentCode\" codeStudent\n            FROM \t\"task\" ta, \n                    \"subject\" su, \n                    \"course\" cu, \n                    \"enrollment\" en, \n                    \"student\" st\n            WHERE \tta.\"subjectID\" = su.\"subjectID\"\n                AND su.\"courseID\" = cu.\"courseID\"\n                AND cu.\"courseID\" = en.\"courseID\"\n                AND en.\"studentID\" = st.\"studentID\"\n                AND st.\"studentID\" = ".concat(studentID, "\n                AND ta.\"isActive\" = ").concat(active, "\n                ORDER BY ta.\"startDate\", ta.\"endDate\" DESC\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, ";\n        "));

          case 7:
            tasks = _context5.sent;

            if (!tasks) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              tasks: tasks[0],
              total: tasks[1].rowCount
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
            returnrError(res, _context5.t0, 'Get Task by Student');

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 15]]);
  }));
  return _getTaskByStudent.apply(this, arguments);
}

function getTaskByStudentSubject(_x11, _x12) {
  return _getTaskByStudentSubject.apply(this, arguments);
} // Update a task


function _getTaskByStudentSubject() {
  _getTaskByStudentSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$params, studentID, subjectID, active, tasks;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$params = req.params, studentID = _req$params.studentID, subjectID = _req$params.subjectID;
            active = req.query.active || true;
            _context6.prev = 2;
            _context6.next = 5;
            return _database.sequelize.query("\n            SELECT\tta.\"taskCode\" codeTask,\n                    ta.\"startDate\" dateStart,\n                    ta.\"endDate\" dateFinish,\n                    ta.\"taskName\" nameTask,\n                    ta.\"taskDetail\" details,\n                    ta.\"isActive\" active,\n                    ta.\"permitsDelay\" delay,\n                    ta.\"maxDelay\" delayDate,\n                    ta.\"image\" preview,\n                    su.\"subjectCode\" codeSubject,\n                    su.\"subjectName\" nameSubject,\n                    cu.\"courseName\" nameCourse,\n                    cu.\"description\" descriptionCourse,\n                    en.\"enrollmentCode\" enrollment,\n                    st.\"studentCode\" codeStudent\n            FROM \t\"task\" ta, \n                    \"subject\" su, \n                    \"course\" cu, \n                    \"enrollment\" en, \n                    \"student\" st\n            WHERE \tta.\"subjectID\" = su.\"subjectID\"\n                AND su.\"courseID\" = cu.\"courseID\"\n                AND cu.\"courseID\" = en.\"courseID\"\n                AND en.\"studentID\" = st.\"studentID\"\n                AND st.\"studentID\" = ".concat(studentID, "\n                AND ta.\"isActive\" = ").concat(active, "\n                AND su.\"subjectID\" = ").concat(subjectID, "\n                ORDER BY ta.\"startDate\", ta.\"endDate\" DESC;\n        "));

          case 5:
            tasks = _context6.sent;

            if (!tasks) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              tasks: tasks[0],
              total: tasks[1].rowCount
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Student ID or Subject ID');

          case 11:
            _context6.next = 17;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            returnrError(res, _context6.t0, 'Get Task by Student and Course');

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 13]]);
  }));
  return _getTaskByStudentSubject.apply(this, arguments);
}

function updateTask(_x13, _x14) {
  return _updateTask.apply(this, arguments);
} // Change to active or inactive a task


function _updateTask() {
  _updateTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var taskID, delayDate, _req$body2, taskCode, startDate, endDate, taskName, taskDetail, permitsDelay, maxDelay, image, subjectID, dbTask, updatedTask;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            taskID = req.params.taskID;
            _req$body2 = req.body, taskCode = _req$body2.taskCode, startDate = _req$body2.startDate, endDate = _req$body2.endDate, taskName = _req$body2.taskName, taskDetail = _req$body2.taskDetail, permitsDelay = _req$body2.permitsDelay, maxDelay = _req$body2.maxDelay, image = _req$body2.image, subjectID = _req$body2.subjectID;
            _context7.prev = 2;
            _context7.next = 5;
            return _Task["default"].findOne({
              attributes: ['taskID', 'taskCode', 'startDate', 'endDate', 'isActive', 'taskName', 'taskDetail', 'permitsDelay', 'maxDelay', 'image', 'subjectID'],
              where: {
                taskID: taskID
              }
            });

          case 5:
            dbTask = _context7.sent;

            if (!(dbTask === null || dbTask === undefined)) {
              _context7.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Task ID');
            _context7.next = 19;
            break;

          case 10:
            if (permitsDelay) {
              delayDate = maxDelay;
            } else {
              delayDate = null;
            }

            _context7.next = 13;
            return _Task["default"].update({
              taskCode: taskCode,
              startDate: startDate,
              endDate: endDate,
              taskName: taskName,
              taskDetail: taskDetail,
              permitsDelay: permitsDelay,
              maxDelay: delayDate,
              image: image,
              subjectID: subjectID
            }, {
              where: {
                taskID: taskID
              }
            });

          case 13:
            updatedTask = _context7.sent;

            if (!updatedTask) {
              _context7.next = 18;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task updated successfully'
            }));

          case 18:
            (0, _errors.returnNotFound)(res, 'Task for update');

          case 19:
            _context7.next = 25;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](2);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Update Task');

          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 21]]);
  }));
  return _updateTask.apply(this, arguments);
}

function changeActivationTask(_x15, _x16) {
  return _changeActivationTask.apply(this, arguments);
} // Delte a task


function _changeActivationTask() {
  _changeActivationTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var taskID, type, value, action, afirmation, negation, changeActivationJSON, dbTask, changeActivation;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            taskID = req.params.taskID;
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

            _context8.prev = 6;
            _context8.next = 9;
            return _Task["default"].findOne({
              attributes: ['taskID', 'taskCode', 'isActive', 'subjectID'],
              where: {
                taskID: taskID
              }
            });

          case 9:
            dbTask = _context8.sent;

            if (!dbTask) {
              _context8.next = 21;
              break;
            }

            _context8.next = 13;
            return _Task["default"].update(changeActivationJSON, {
              where: {
                taskID: taskID,
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
              message: 'Task ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Task or Task alread ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context8.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Task ID');

          case 22:
            _context8.next = 28;
            break;

          case 24:
            _context8.prev = 24;
            _context8.t0 = _context8["catch"](6);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Change Activation Task');

          case 28:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[6, 24]]);
  }));
  return _changeActivationTask.apply(this, arguments);
}

function deleteTask(_x17, _x18) {
  return _deleteTask.apply(this, arguments);
}

function _deleteTask() {
  _deleteTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var taskID, countDeleted;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            taskID = req.params.taskID;
            _context9.prev = 1;
            _context9.next = 4;
            return _Task["default"].destroy({
              where: {
                taskID: taskID
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
              message: 'Task deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task ID');

          case 10:
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            console.log('Error:', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Delete Task');

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return _deleteTask.apply(this, arguments);
}