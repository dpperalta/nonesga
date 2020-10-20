"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskResource = createTaskResource;
exports.getTaskResources = getTaskResources;
exports.getTaskResource = getTaskResource;
exports.getTaskResourcesByTask = getTaskResourcesByTask;
exports.updateTaskResource = updateTaskResource;
exports.changeActivationTaskResource = changeActivationTaskResource;
exports.deleteTaskResource = deleteTaskResource;

var _TaskResource = _interopRequireDefault(require("../models/TaskResource"));

var _Task = _interopRequireDefault(require("../models/Task"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new TaskResource
function createTaskResource(_x, _x2) {
  return _createTaskResource.apply(this, arguments);
} // Get all tasksResources


function _createTaskResource() {
  _createTaskResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, resourceName, resourceType, resourceDetail, resource, taskID, newTaskResource;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, resourceName = _req$body.resourceName, resourceType = _req$body.resourceType, resourceDetail = _req$body.resourceDetail, resource = _req$body.resource, taskID = _req$body.taskID;
            _context.prev = 1;
            _context.next = 4;
            return _TaskResource["default"].create({
              resourceName: resourceName,
              resourceType: resourceType,
              resourceDetail: resourceDetail,
              resource: resource,
              taskID: taskID
            }, {
              fields: ['resourceName', 'resourceType', 'resourceDetail', 'resource', 'taskID'],
              returning: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID']
            });

          case 4:
            newTaskResource = _context.sent;

            if (!newTaskResource) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resource created successfully',
              taskResource: newTaskResource
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Task Resource');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createTaskResource.apply(this, arguments);
}

function getTaskResources(_x3, _x4) {
  return _getTaskResources.apply(this, arguments);
} // Get a Task Resource by ID


function _getTaskResources() {
  _getTaskResources = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, active, taskResources;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active || true;
            _context2.prev = 3;
            _context2.next = 6;
            return _TaskResource["default"].findAndCountAll({
              attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
              where: {
                isActive: active
              },
              include: [{
                model: _Task["default"],
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            taskResources = _context2.sent;

            if (!(taskResources.count > 0)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              taskResources: taskResources
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Any Task Resource');

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Task Resources');

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return _getTaskResources.apply(this, arguments);
}

function getTaskResource(_x5, _x6) {
  return _getTaskResource.apply(this, arguments);
} // Get all task resources by task


function _getTaskResource() {
  _getTaskResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var taskResourceID, taskResource;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            taskResourceID = req.params.taskResourceID;
            _context3.prev = 1;
            _context3.next = 4;
            return _TaskResource["default"].findOne({
              attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
              where: {
                taskResourceID: taskResourceID
              },
              include: [{
                model: _Task["default"],
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
              }]
            });

          case 4:
            taskResource = _context3.sent;

            if (!taskResource) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              taskResource: taskResource
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Resource ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get a Task Resource by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getTaskResource.apply(this, arguments);
}

function getTaskResourcesByTask(_x7, _x8) {
  return _getTaskResourcesByTask.apply(this, arguments);
} // Update a task resource


function _getTaskResourcesByTask() {
  _getTaskResourcesByTask = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var taskID, active, taskResources;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            taskID = req.params.taskID;
            active = req.query.active || true;
            _context4.prev = 2;
            _context4.next = 5;
            return _TaskResource["default"].findAndCountAll({
              attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
              where: {
                taskID: taskID,
                isActive: active
              },
              include: [{
                model: _Task["default"],
                attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
              }]
            });

          case 5:
            taskResources = _context4.sent;

            if (!(taskResources.count > 0)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              taskResources: taskResources
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
            (0, _errors.returnError)(res, _context4.t0, 'Get Task Resoruces by Task');

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return _getTaskResourcesByTask.apply(this, arguments);
}

function updateTaskResource(_x9, _x10) {
  return _updateTaskResource.apply(this, arguments);
} // Change to active or inactive a task resource


function _updateTaskResource() {
  _updateTaskResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var taskResourceID, _req$body2, resourceName, resourceType, resourceDetail, resource, taskID, dbTaskResource, updatedTaskResource;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            taskResourceID = req.params.taskResourceID;
            _req$body2 = req.body, resourceName = _req$body2.resourceName, resourceType = _req$body2.resourceType, resourceDetail = _req$body2.resourceDetail, resource = _req$body2.resource, taskID = _req$body2.taskID;
            _context5.prev = 2;
            _context5.next = 5;
            return _TaskResource["default"].findOne({
              attributes: ['taskResourceID', 'resourceName', 'resourceType', 'resourceDetail', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
              where: {
                taskResourceID: taskResourceID
              }
            });

          case 5:
            dbTaskResource = _context5.sent;

            if (!(dbTaskResource === null || dbTaskResource === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Task Resource ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _TaskResource["default"].update({
              resourceName: resourceName,
              resourceType: resourceType,
              resourceDetail: resourceDetail,
              resource: resource,
              taskID: taskID
            }, {
              where: {
                taskResourceID: taskResourceID
              }
            });

          case 12:
            updatedTaskResource = _context5.sent;

            if (!updateTaskResource) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resource updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Task Resource ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Task Resource');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateTaskResource.apply(this, arguments);
}

function changeActivationTaskResource(_x11, _x12) {
  return _changeActivationTaskResource.apply(this, arguments);
} // Delte a task resource


function _changeActivationTaskResource() {
  _changeActivationTaskResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var taskResourceID, type, value, action, afirmation, negation, changeActivationJSON, dbTaskResource, changeActivation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            taskResourceID = req.params.taskResourceID;
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

            _context6.prev = 6;
            _context6.next = 9;
            return _TaskResource["default"].findOne({
              attributes: ['taskResourceID', 'resourceName', 'isActive', 'registeredDate', 'unregisteredDate', 'taskID'],
              where: {
                taskResourceID: taskResourceID
              }
            });

          case 9:
            dbTaskResource = _context6.sent;

            if (!dbTaskResource) {
              _context6.next = 21;
              break;
            }

            _context6.next = 13;
            return _TaskResource["default"].update(changeActivationJSON, {
              where: {
                taskResourceID: taskResourceID,
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
              message: 'Task Resource ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Task Resource or Task Resource alread ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context6.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Task Resource ID');

          case 22:
            _context6.next = 28;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](6);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Change Activation Task Resource');

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 24]]);
  }));
  return _changeActivationTaskResource.apply(this, arguments);
}

function deleteTaskResource(_x13, _x14) {
  return _deleteTaskResource.apply(this, arguments);
}

function _deleteTaskResource() {
  _deleteTaskResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var taskResourceID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            taskResourceID = req.params.taskResourceID;
            _context7.prev = 1;
            _context7.next = 4;
            return _TaskResource["default"].destroy({
              where: {
                taskResourceID: taskResourceID
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
              message: 'Task Resource deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Resource ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Delete Task Resource');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deleteTaskResource.apply(this, arguments);
}