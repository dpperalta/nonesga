"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCourse = createCourse;
exports.getCourses = getCourses;
exports.changeActivationCourse = changeActivationCourse;
exports.updateCourse = updateCourse;
exports.getCourse = getCourse;
exports.deleteCourse = deleteCourse;

var _Course = _interopRequireDefault(require("../models/Course"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Course
function createCourse(_x, _x2) {
  return _createCourse.apply(this, arguments);
} // Get all active countries


function _createCourse() {
  _createCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, courseCode, courseName, description, status, newCourse;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, courseCode = _req$body.courseCode, courseName = _req$body.courseName, description = _req$body.description;
            status = 1;
            _context.prev = 2;
            _context.next = 5;
            return _Course["default"].create({
              courseCode: courseCode,
              courseName: courseName,
              description: description
            }, {
              fields: ['courseCode', 'courseName', 'description'],
              returning: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate']
            });

          case 5:
            newCourse = _context.sent;

            if (!newCourse) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Course created successfully',
              Course: newCourse
            }));

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Course');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _createCourse.apply(this, arguments);
}

function getCourses(_x3, _x4) {
  return _getCourses.apply(this, arguments);
} // Change to active or inactive to a Course


function _getCourses() {
  _getCourses = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, countries;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Course["default"].findAndCountAll({
              attributes: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate'],
              order: [['courseName', 'ASC']],
              where: {
                isActive: true
              },
              limit: limit,
              offset: from
            });

          case 5:
            countries = _context2.sent;

            if (!countries) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              countries: countries
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Course');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              e: _context2.t0
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getCourses.apply(this, arguments);
}

function changeActivationCourse(_x5, _x6) {
  return _changeActivationCourse.apply(this, arguments);
} // Update a Course


function _changeActivationCourse() {
  _changeActivationCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var courseID, type, value, action, afirmation, negation, changeActivationJSON, dbCourse, changeActivation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            courseID = req.params.courseID;
            type = req.query.type;
            action = '';
            afirmation = '';
            negation = '';

            if (type.toLowerCase() === 'activate') {
              value = true;
              action = 'Activating';
              afirmation = 'active';
              negation = 'inactive';
              changeActivationJSON = {
                isActive: value,
                unregisteredDate: null
              };
            } else {
              if (type.toLowerCase() === 'inactivate') {
                value = false;
                action = 'Inactivating';
                afirmation = 'inactive';
                negation = 'active';
                changeActivationJSON = {
                  isActive: value,
                  unregisteredDate: _database.sequelize.literal('CURRENT_TIMESTAMP')
                };
              } else {
                (0, _errors.returnWrongError)(res, 'type', 'request');
              }
            }

            _context3.prev = 6;
            _context3.next = 9;
            return _Course["default"].findOne({
              attributes: ['courseID', 'courseCode', 'courseName', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                courseID: courseID
              }
            });

          case 9:
            dbCourse = _context3.sent;

            if (!dbCourse) {
              _context3.next = 21;
              break;
            }

            _context3.next = 13;
            return _Course["default"].update(changeActivationJSON, {
              where: {
                courseID: courseID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context3.sent;

            if (!(changeActivation > 0)) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Course ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context3.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error while ' + action + ' a Course or Course already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context3.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Course ID');

          case 22:
            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](6);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Change Activation Course');

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 24]]);
  }));
  return _changeActivationCourse.apply(this, arguments);
}

function updateCourse(_x7, _x8) {
  return _updateCourse.apply(this, arguments);
} // Get information of a Course by ID


function _updateCourse() {
  _updateCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var courseID, _req$body2, courseCode, courseName, description, dbCourse, _updateCourse2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            courseID = req.params.courseID;
            _req$body2 = req.body, courseCode = _req$body2.courseCode, courseName = _req$body2.courseName, description = _req$body2.description;
            _context4.prev = 2;
            _context4.next = 5;
            return _Course["default"].findOne({
              attributes: ['courseID', 'courseName', 'courseCode', 'description'],
              where: {
                courseID: courseID
              }
            });

          case 5:
            dbCourse = _context4.sent;

            if (!(dbCourse === null || dbCourse === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Course ID');
            _context4.next = 18;
            break;

          case 10:
            _context4.next = 12;
            return _Course["default"].update({
              courseCode: courseCode,
              courseName: courseName,
              description: description
            }, {
              where: {
                courseID: courseID
              }
            });

          case 12:
            _updateCourse2 = _context4.sent;

            if (!_updateCourse2) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Course updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Course ID');

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update Course');

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 20]]);
  }));
  return _updateCourse.apply(this, arguments);
}

function getCourse(_x9, _x10) {
  return _getCourse.apply(this, arguments);
} // Delete a Course


function _getCourse() {
  _getCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var courseID, course;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            courseID = req.params.courseID;
            _context5.prev = 1;
            _context5.next = 4;
            return _Course["default"].findOne({
              attributes: ['courseID', 'courseCode', 'courseName', 'description', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                courseID: courseID
              }
            });

          case 4:
            course = _context5.sent;

            if (!course) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              course: course
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Course ID');

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);
            return _context5.abrupt("return", res.status(500).json({
              e: _context5.t0
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _getCourse.apply(this, arguments);
}

function deleteCourse(_x11, _x12) {
  return _deleteCourse.apply(this, arguments);
}

function _deleteCourse() {
  _deleteCourse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var courseID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            courseID = req.params.courseID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Course["default"].destroy({
              where: {
                courseID: courseID
              }
            });

          case 4:
            countDeleted = _context6.sent;

            if (!(countDeleted > 0)) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Course deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Course ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Course');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteCourse.apply(this, arguments);
}