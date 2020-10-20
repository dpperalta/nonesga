"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskResolutionResource = createTaskResolutionResource;
exports.getTaskResolutionResources = getTaskResolutionResources;
exports.getTaskResolutionResourceByID = getTaskResolutionResourceByID;
exports.getTaskResolutionResourceByTaskResolution = getTaskResolutionResourceByTaskResolution;
exports.updateTaskResolutionResource = updateTaskResolutionResource;
exports.changeActivationTaskResolutionResource = changeActivationTaskResolutionResource;
exports.deleteTaskResolutionResource = deleteTaskResolutionResource;

var _TaskResolutionResource = _interopRequireDefault(require("../models/TaskResolutionResource"));

var _TaskResolution = _interopRequireDefault(require("../models/TaskResolution"));

var _database = require("../database/database");

var _errors = require("./errors");

var _Task = _interopRequireDefault(require("../models/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Task Resolution Resource
function createTaskResolutionResource(_x, _x2) {
  return _createTaskResolutionResource.apply(this, arguments);
} // Get all task resolution resources


function _createTaskResolutionResource() {
  _createTaskResolutionResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, resourceName, details, resource, resolutionID, newTaskResolutionResource;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, resourceName = _req$body.resourceName, details = _req$body.details, resource = _req$body.resource, resolutionID = _req$body.resolutionID;
            _context.prev = 1;
            _context.next = 4;
            return _TaskResolutionResource["default"].create({
              resourceName: resourceName,
              details: details,
              resource: resource,
              updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              resolutionID: resolutionID
            }, {
              fields: ['resourceName', 'details', 'updatedDate', 'resource', 'resolutionID'],
              returning: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID']
            });

          case 4:
            newTaskResolutionResource = _context.sent;

            if (!newTaskResolutionResource) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resolution Resource created successfully',
              taskResolutionResourse: newTaskResolutionResource
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Task Resolution Resource');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createTaskResolutionResource.apply(this, arguments);
}

function getTaskResolutionResources(_x3, _x4) {
  return _getTaskResolutionResources.apply(this, arguments);
} // Get a Task Resolution Resource by ID


function _getTaskResolutionResources() {
  _getTaskResolutionResources = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, taskResolutionResourses;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0; //const active = req.query.active || true;

            _context2.prev = 2;
            _context2.next = 5;
            return _TaskResolutionResource["default"].findAndCountAll({
              attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],

              /* where: {
                   isActive: active
               },*/
              include: [{
                model: _TaskResolution["default"],
                attributes: ['resolutionID', 'isActive', 'detail', 'isPublished', 'publishedDate'],
                include: [{
                  model: _Task["default"],
                  attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
                }]
              }],
              limit: limit,
              offset: from
            });

          case 5:
            taskResolutionResourses = _context2.sent;

            if (!(taskResolutionResourses.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              taskResolutionResourses: taskResolutionResourses
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Task Resolution Resource');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Task Resolution Resources');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getTaskResolutionResources.apply(this, arguments);
}

function getTaskResolutionResourceByID(_x5, _x6) {
  return _getTaskResolutionResourceByID.apply(this, arguments);
} // Get all task resolution resources by task resolution


function _getTaskResolutionResourceByID() {
  _getTaskResolutionResourceByID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var resourceID, taskResolutionResource;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            resourceID = req.params.resourceID;
            _context3.prev = 1;
            _context3.next = 4;
            return _TaskResolutionResource["default"].findOne({
              attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
              where: {
                resourceID: resourceID
              },
              include: [{
                model: _TaskResolution["default"],
                attributes: ['resolutionID', 'isActive', 'detail', 'isPublished', 'publishedDate'],
                include: [{
                  model: _Task["default"],
                  attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
                }]
              }]
            });

          case 4:
            taskResolutionResource = _context3.sent;

            if (!taskResolutionResource) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              taskResolutionResource: taskResolutionResource
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Resolutoin Resource ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Task Resolution Resource by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getTaskResolutionResourceByID.apply(this, arguments);
}

function getTaskResolutionResourceByTaskResolution(_x7, _x8) {
  return _getTaskResolutionResourceByTaskResolution.apply(this, arguments);
} // Update a task resolution resource


function _getTaskResolutionResourceByTaskResolution() {
  _getTaskResolutionResourceByTaskResolution = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var resolutionID, taskResolutionResources;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            resolutionID = req.params.resolutionID;
            _context4.prev = 1;
            _context4.next = 4;
            return _TaskResolutionResource["default"].findAndCountAll({
              attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
              where: {
                resolutionID: resolutionID
              },
              include: [{
                model: _TaskResolution["default"],
                attributes: ['resolutionID', 'isActive', 'detail', 'isPublished', 'publishedDate'],
                include: [{
                  model: _Task["default"],
                  attributes: ['taskID', 'taskCode', 'taskName', 'taskDetail']
                }]
              }]
            });

          case 4:
            taskResolutionResources = _context4.sent;

            if (!taskResolutionResources) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              taskResolutionResources: taskResolutionResources
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Task Resolutoin ID');

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Task Resolution Resource by Task Resolution');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return _getTaskResolutionResourceByTaskResolution.apply(this, arguments);
}

function updateTaskResolutionResource(_x9, _x10) {
  return _updateTaskResolutionResource.apply(this, arguments);
} // Change activation status of a task resolution resource


function _updateTaskResolutionResource() {
  _updateTaskResolutionResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var resourceID, _req$body2, resourceName, details, resource, resolutionID, dbTaskResolutionResourceResource, updatedTaskResolutionResource;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            resourceID = req.params.resourceID;
            _req$body2 = req.body, resourceName = _req$body2.resourceName, details = _req$body2.details, resource = _req$body2.resource, resolutionID = _req$body2.resolutionID;
            _context5.prev = 2;
            _context5.next = 5;
            return _TaskResolutionResource["default"].findOne({
              attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resourceID'],
              where: {
                resourceID: resourceID
              }
            });

          case 5:
            dbTaskResolutionResourceResource = _context5.sent;

            if (!(dbTaskResolutionResourceResource === null || dbTaskResolutionResourceResource === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(re, 'Task Resolution Resource ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _TaskResolutionResource["default"].update({
              resourceName: resourceName,
              details: details,
              resource: resource,
              updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              resolutionID: resolutionID
            }, {
              where: {
                resourceID: resourceID
              }
            });

          case 12:
            updatedTaskResolutionResource = _context5.sent;

            if (!updatedTaskResolutionResource) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Task Resoluton Resource updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Task Resolution Resource ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Task Resolution Resource');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateTaskResolutionResource.apply(this, arguments);
}

function changeActivationTaskResolutionResource(_x11, _x12) {
  return _changeActivationTaskResolutionResource.apply(this, arguments);
} // Delete a Task Resolution Resource


function _changeActivationTaskResolutionResource() {
  _changeActivationTaskResolutionResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var resourceID, type, value, action, afirmation, negation, changeActivationJSON, dbTaskResolutionResourceA, changeActivation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            resourceID = req.params.resourceID;
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
                  updatedDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
                };
              } else {
                (0, _errors.returnWrongError)(res, 'type', 'request');
              }
            }

            _context6.prev = 6;
            _context6.next = 9;
            return _TaskResolutionResource["default"].findOne({
              attributes: ['resourceID', 'resourceName', 'details', 'resource', 'isActive', 'registeredDate', 'unregisteredDate', 'updatedDate', 'resolutionID'],
              where: {
                resourceID: resourceID
              }
            });

          case 9:
            dbTaskResolutionResourceA = _context6.sent;

            if (!dbTaskResolutionResourceA) {
              _context6.next = 21;
              break;
            }

            _context6.next = 13;
            return _TaskResolutionResource["default"].update(changeActivationJSON, {
              where: {
                resourceID: resourceID,
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
              message: 'Task Resolution Resource ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Task Resolution or Task Resolution Resource already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context6.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Task Resolution Resource ID');

          case 22:
            _context6.next = 28;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](6);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Change Activation Task Resolution Resource');

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 24]]);
  }));
  return _changeActivationTaskResolutionResource.apply(this, arguments);
}

function deleteTaskResolutionResource(_x13, _x14) {
  return _deleteTaskResolutionResource.apply(this, arguments);
}

function _deleteTaskResolutionResource() {
  _deleteTaskResolutionResource = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var resourceID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            resourceID = req.params.resourceID;
            _context7.prev = 1;
            _context7.next = 4;
            return _TaskResolutionResource["default"].destroy({
              where: {
                resourceID: resourceID
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
              message: 'Task Resolution Resource deleted successfully'
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
            (0, _errors.returnError)(res, _context7.t0, 'Delete Task Resolution Resource');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deleteTaskResolutionResource.apply(this, arguments);
}