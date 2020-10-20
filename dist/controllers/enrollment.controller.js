"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEnrollment = createEnrollment;
exports.getEnrollments = getEnrollments;
exports.getEnrollment = getEnrollment;
exports.getEnrollmentByParameter = getEnrollmentByParameter;
exports.getEnrollmentByCollege = getEnrollmentByCollege;
exports.getEnrollmentByDNI = getEnrollmentByDNI;
exports.updateEnrollment = updateEnrollment;
exports.updateProcessEnrollment = updateProcessEnrollment;
exports.deleteEnrollment = deleteEnrollment;

var _Enrollment = _interopRequireDefault(require("../models/Enrollment"));

var _database = require("../database/database");

var _errors = require("./errors");

var _AcademicPeriod = _interopRequireDefault(require("../models/AcademicPeriod"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _User = _interopRequireDefault(require("../models/User"));

var _Course = _interopRequireDefault(require("../models/Course"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Enrollment
function createEnrollment(_x, _x2) {
  return _createEnrollment.apply(this, arguments);
} // Get all Enrollments


function _createEnrollment() {
  _createEnrollment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, enrollmentCode, studentID, userID, periodID, courseID, newEnrollment;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, enrollmentCode = _req$body.enrollmentCode, studentID = _req$body.studentID, userID = _req$body.userID, periodID = _req$body.periodID, courseID = _req$body.courseID;
            _context.prev = 1;
            _context.next = 4;
            return _Enrollment["default"].create({
              enrollmentCode: enrollmentCode,
              statusChangeDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              statusID: 1,
              studentID: studentID,
              userID: userID,
              periodID: periodID,
              courseID: courseID
            }, {
              fields: ['enrollmentCode', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID'],
              returnint: ['enrollmentID', 'enrollmentCode', 'isActive', 'registeredDate', 'unregisteredDate', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID']
            });

          case 4:
            newEnrollment = _context.sent;

            if (!newEnrollment) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Enrollment created successfully',
              enrollment: newEnrollment
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Enrollment');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createEnrollment.apply(this, arguments);
}

function getEnrollments(_x3, _x4) {
  return _getEnrollments.apply(this, arguments);
} // Get an Enrollment by ID


function _getEnrollments() {
  _getEnrollments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, enrollments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Enrollment["default"].findAndCountAll({
              attributes: ['enrollmentID', 'enrollmentCode', 'isActive', 'registeredDate', 'unregisteredDate', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID'],
              order: [['registeredDate', 'ASC']],
              include: [{
                model: _AcademicPeriod["default"],
                attributes: ['periodID', 'periodName', 'detail']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'bio'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _User["default"],
                attributes: ['userID', 'email']
                /*,
                                    include: [{
                                        model: Person,
                                        attributes: ['personID', 'completeName']
                                    }]*/

              }, {
                model: _Course["default"],
                attributes: ['courseID', 'courseName', 'description']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            enrollments = _context2.sent;

            if (!enrollments) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              enrollments: enrollments
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Enrollment');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Enrollments');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getEnrollments.apply(this, arguments);
}

function getEnrollment(_x5, _x6) {
  return _getEnrollment.apply(this, arguments);
} // Get enrollment by parameter (student, course, user, period, status) ID


function _getEnrollment() {
  _getEnrollment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var enrollmentID, enrollment;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            enrollmentID = req.params.enrollmentID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Enrollment["default"].findOne({
              attributes: ['enrollmentID', 'enrollmentCode', 'registeredDate', 'unregisteredDate', 'isActive', 'statusChangeDate', 'statusID', 'studentID', 'userID', 'periodID', 'courseID'],
              where: {
                enrollmentID: enrollmentID
              },
              include: [{
                model: _AcademicPeriod["default"],
                attributes: ['periodID', 'periodName', 'detail']
              }, {
                model: _Student["default"],
                attributes: ['studentID', 'bio'],
                include: [{
                  model: _Person["default"],
                  attributes: ['personID', 'completeName']
                }]
              }, {
                model: _User["default"],
                attributes: ['userID', 'email']
                /*,
                                    include: [{
                                        model: Person,
                                        attributes: ['personID', 'completeName']
                                    }]*/

              }, {
                model: _Course["default"],
                attributes: ['courseID', 'courseName', 'description']
              }]
            });

          case 4:
            enrollment = _context3.sent;

            if (!enrollment) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              enrollment: enrollment
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Enrollment ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get an Enrollment');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getEnrollment.apply(this, arguments);
}

function getEnrollmentByParameter(_x7, _x8) {
  return _getEnrollmentByParameter.apply(this, arguments);
} // Get enrollment by college


function _getEnrollmentByParameter() {
  _getEnrollmentByParameter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var parameter, searchParameter, limit, from, valueID, total, count, enrollments, totalCount;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            parameter = req.query.parameter;
            searchParameter = parameter.toLowerCase() + 'ID';
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            valueID = req.params.valueID;
            total = 0;

            if (!(searchParameter === 'statusID' || searchParameter === 'studentID' || searchParameter === 'userID' || searchParameter === 'periodID' || searchParameter === 'courseID')) {
              _context4.next = 29;
              break;
            }

            _context4.prev = 7;
            _context4.next = 10;
            return _database.sequelize.query("\n                SELECT\tCOUNT(*)\n                FROM \t\"enrollment\" e, \n                        \"enrollmentStatus\" es, \n                        \"student\" s, \n                        \"user\" u, \n                        \"academicPeriod\" ap, \n                        \"course\" cu\n                WHERE e.\"statusID\" = es.\"statusID\"\n                    AND e.\"studentID\" = s.\"studentID\"\n                    AND e.\"userID\" = u.\"userID\"\n                    AND e.\"periodID\" = ap.\"periodID\"\n                    AND e.\"courseID\" = cu.\"courseID\"\n                    AND e.\"".concat(parameter.toLowerCase(), "ID\" = ").concat(valueID, "\n            "));

          case 10:
            count = _context4.sent;
            _context4.next = 13;
            return _database.sequelize.query("\n                    SELECT\te.\"enrollmentID\" idEnrollment,\n                            e.\"enrollmentCode\" codeEnrollment,\n                            e.\"isActive\" active,\n                            e.\"registeredDate\" createdAt,\n                            e.\"statusChangeDate\" updatedAt,\n                            es.\"code\" codeEnrollment,\n                            es.\"description\" enrollmentDescription,\n                            s.\"studentCode\" codeStudent,\n                            s.\"bio\" studentBio,\n                            (SELECT xp.\"completeName\" FROM \"student\" xs, \"person\" xp WHERE xs.\"personID\" = xp.\"personID\" AND xs.\"studentID\" = s.\"studentID\") studentName,\n                            u.\"email\" userMail,\n                            (SELECT xp.\"completeName\" FROM \"user\" xu, \"person\" xp WHERE xu.\"personID\" = xp.\"personID\" AND xu.\"userID\" = u.\"userID\") userName,\n                            ap.\"periodName\" academicPeriod,\n                            ap.\"detail\" periodDetail,\n                            cu.\"courseCode\" codeCourse,\n                            cu.\"courseName\" curseName,\n                            cu.\"description\" curseDescription\n                    FROM \t\"enrollment\" e, \n                            \"enrollmentStatus\" es, \n                            \"student\" s, \n                            \"user\" u, \n                            \"academicPeriod\" ap, \n                            \"course\" cu\n                    WHERE e.\"statusID\" = es.\"statusID\"\n                        AND e.\"studentID\" = s.\"studentID\"\n                        AND e.\"userID\" = u.\"userID\"\n                        AND e.\"periodID\" = ap.\"periodID\"\n                        AND e.\"courseID\" = cu.\"courseID\"\n                        AND e.\"".concat(parameter.toLowerCase(), "ID\" = ").concat(valueID, "\n                        ORDER BY e.\"isActive\", e.\"registeredDate\" DESC\n                        LIMIT ").concat(limit, "\n                        OFFSET ").concat(from, "\n            "));

          case 13:
            enrollments = _context4.sent;
            total = parseInt(enrollments[1].rowCount);
            totalCount = parseInt(count[1].rows[0].count);

            if (!(total > 0)) {
              _context4.next = 20;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              enrollments: enrollments[0],
              total: totalCount
            }));

          case 20:
            (0, _errors.returnNotFound)(res, 'Enrollmente by ' + searchParameter);

          case 21:
            _context4.next = 27;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](7);
            console.log('Error: ', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Search Enrrollment by Parameter ' + searchParameter);

          case 27:
            _context4.next = 30;
            break;

          case 29:
            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Invalid parameter for search'
            }));

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[7, 23]]);
  }));
  return _getEnrollmentByParameter.apply(this, arguments);
}

function getEnrollmentByCollege(_x9, _x10) {
  return _getEnrollmentByCollege.apply(this, arguments);
} // Ger enrollment by DNI


function _getEnrollmentByCollege() {
  _getEnrollmentByCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var collegeID, limit, from, count, enrollments, total;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            collegeID = req.params.collegeID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context5.prev = 3;
            _context5.next = 6;
            return _database.sequelize.query("\n            SELECT \tCOUNT(*)\n            FROM\t\"enrollment\" e, \n                    \"enrollmentStatus\" es, \n                    \"student\" s, \n                    \"user\" u, \n                    \"academicPeriod\" ap, \n                    \"course\" cu,\n                    \"college\" co\n            WHERE   e.\"statusID\" = es.\"statusID\"\n                AND e.\"studentID\" = s.\"studentID\"\n                AND e.\"userID\" = u.\"userID\"\n                AND e.\"periodID\" = ap.\"periodID\"\n                AND e.\"courseID\" = cu.\"courseID\"\n                AND u.\"collegeID\" = co.\"collegeID\"\n                AND u.\"collegeID\" = ".concat(collegeID, "\n        "));

          case 6:
            count = _context5.sent;
            _context5.next = 9;
            return _database.sequelize.query("\n            SELECT \te.\"enrollmentID\" idEnrollment,\n                    e.\"enrollmentCode\" codeEnrollment,\n                    e.\"isActive\" active,\n                    e.\"registeredDate\" createdAt,\n                    e.\"statusChangeDate\" updatedAt,\n                    es.\"code\" codeEnrollment,\n                    es.\"description\" enrollmentDescription,\n                    s.\"studentCode\" codeStudent,\n                    s.\"bio\" studentBio,\n                    (SELECT xp.\"completeName\" FROM \"student\" xs, \"person\" xp WHERE xs.\"personID\" = xp.\"personID\" AND xs.\"studentID\" = s.\"studentID\") studentName,\n                    u.\"email\" userMail,\n                    (SELECT xp.\"completeName\" FROM \"user\" xu, \"person\" xp WHERE xu.\"personID\" = xp.\"personID\" AND xu.\"userID\" = u.\"userID\") \"userName\",\n                    ap.\"periodName\" academicPeriod,\n                    ap.\"detail\" periodDetail,\n                    cu.\"courseCode\" codeCourse,\n                    cu.\"courseName\" curseName,\n                    cu.\"description\" curseDescription,\n                    co.\"collegeName\" college\n            FROM\t\"enrollment\" e, \n                    \"enrollmentStatus\" es, \n                    \"student\" s, \n                    \"user\" u, \n                    \"academicPeriod\" ap, \n                    \"course\" cu,\n                    \"college\" co\n            WHERE   e.\"statusID\" = es.\"statusID\"\n                AND e.\"studentID\" = s.\"studentID\"\n                AND e.\"userID\" = u.\"userID\"\n                AND e.\"periodID\" = ap.\"periodID\"\n                AND e.\"courseID\" = cu.\"courseID\"\n                AND u.\"collegeID\" = co.\"collegeID\"\n                AND u.\"collegeID\" = ".concat(collegeID, "\n                ORDER BY e.\"isActive\", e.\"registeredDate\" DESC\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, "\n        "));

          case 9:
            enrollments = _context5.sent;
            total = parseInt(count[1].rows[0].count);

            if (!(total > 0)) {
              _context5.next = 15;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              enrollments: enrollments[0],
              total: total
            }));

          case 15:
            (0, _errors.returnNotFound)(res, 'College ID');

          case 16:
            _context5.next = 22;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](3);
            console.log('Error', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Enrollment by College');

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 18]]);
  }));
  return _getEnrollmentByCollege.apply(this, arguments);
}

function getEnrollmentByDNI(_x11, _x12) {
  return _getEnrollmentByDNI.apply(this, arguments);
} // Update the enrollment


function _getEnrollmentByDNI() {
  _getEnrollmentByDNI = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var dni, limit, from, enrollment;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            dni = req.params.dni;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context6.prev = 3;
            _context6.next = 6;
            return _database.sequelize.query("\n            SELECT \te.\"enrollmentID\" idEnrollment,\n                    e.\"enrollmentCode\" codeEnrollment,\n                    e.\"isActive\" active,\n                    e.\"registeredDate\" createdAt,\n                    e.\"statusChangeDate\" updatedAt,\n                    es.\"code\" codeEnrollment,\n                    es.\"description\" enrollmentDescription,\n                    s.\"studentCode\" codeStudent,\n                    s.\"bio\" studentBio,\n                    (SELECT xp.\"completeName\" FROM \"student\" xs, \"person\" xp WHERE xs.\"personID\" = xp.\"personID\" AND xs.\"studentID\" = s.\"studentID\") studentName,\n                    u.\"email\" userMail,\n                    (SELECT xp.\"completeName\" FROM \"user\" xu, \"person\" xp WHERE xu.\"personID\" = xp.\"personID\" AND xu.\"userID\" = u.\"userID\") \"userName\",\n                    ap.\"periodName\" academicPeriod,\n                    ap.\"detail\" periodDetail,\n                    cu.\"courseCode\" codeCourse,\n                    cu.\"courseName\" curseName,\n                    cu.\"description\" curseDescription\n            FROM\t\"enrollment\" e, \n                    \"enrollmentStatus\" es, \n                    \"student\" s, \n                    \"user\" u, \n                    \"academicPeriod\" ap, \n                    \"course\" cu,\n                    \"person\" pe\n            WHERE   e.\"statusID\" = es.\"statusID\"\n                AND e.\"studentID\" = s.\"studentID\"\n                AND e.\"userID\" = u.\"userID\"\n                AND e.\"periodID\" = ap.\"periodID\"\n                AND e.\"courseID\" = cu.\"courseID\"\n                AND u.\"personID\" = pe.\"personID\"\n                AND u.\"isActive\" = true\n                AND pe.\"dni\" = '".concat(dni, "'\n                ORDER BY e.\"isActive\", e.\"registeredDate\" DESC\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, "\n        "));

          case 6:
            enrollment = _context6.sent;

            if (!enrollment) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              enrollment: enrollment[0],
              total: enrollment[1].rowCount
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'DNI');

          case 12:
            _context6.next = 18;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](3);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Enrollment by DNI');

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 14]]);
  }));
  return _getEnrollmentByDNI.apply(this, arguments);
}

function updateEnrollment(_x13, _x14) {
  return _updateEnrollment.apply(this, arguments);
} // Update an Enrollment for the enrollment process


function _updateEnrollment() {
  _updateEnrollment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var enrollmentID, _req$body2, enrollmentCode, statusChangeDate, statusID, studentID, isActive, userID, periodID, courseID, dbEnrollment, _updateEnrollment2;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            enrollmentID = req.params.enrollmentID;
            _req$body2 = req.body, enrollmentCode = _req$body2.enrollmentCode, statusChangeDate = _req$body2.statusChangeDate, statusID = _req$body2.statusID, studentID = _req$body2.studentID, isActive = _req$body2.isActive, userID = _req$body2.userID, periodID = _req$body2.periodID, courseID = _req$body2.courseID;
            _context7.prev = 2;
            _context7.next = 5;
            return _Enrollment["default"].findOne({
              attributes: ['enrollmentID', 'enrollmentCode', 'statusChangeDate', 'statusID', 'studentID', 'isActive', 'userID', 'periodID', 'courseID'],
              where: {
                enrollmentID: enrollmentID
              }
            });

          case 5:
            dbEnrollment = _context7.sent;

            if (!(dbEnrollment === null || dbEnrollment === undefined)) {
              _context7.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Enrollment ID');
            _context7.next = 18;
            break;

          case 10:
            _context7.next = 12;
            return _Enrollment["default"].update({
              enrollmentCode: enrollmentCode,
              statusChangeDate: statusChangeDate,
              statusID: statusID,
              studentID: studentID,
              isActive: isActive,
              userID: userID,
              periodID: periodID,
              courseID: courseID
            }, {
              where: {
                enrollmentID: enrollmentID
              }
            });

          case 12:
            _updateEnrollment2 = _context7.sent;

            if (!_updateEnrollment2) {
              _context7.next = 17;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Enrollment updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Enrollment ID');

          case 18:
            _context7.next = 24;
            break;

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](2);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Update Enrollment');

          case 24:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 20]]);
  }));
  return _updateEnrollment.apply(this, arguments);
}

function updateProcessEnrollment(_x15, _x16) {
  return _updateProcessEnrollment.apply(this, arguments);
}

function _updateProcessEnrollment() {
  _updateProcessEnrollment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var enrollmentID, status, statusCode, udpateQuery, dbCode, _updateEnrollment3;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            enrollmentID = req.params.enrollmentID;
            status = req.query.status;
            _context8.prev = 2;
            _context8.next = 5;
            return _database.sequelize.query("\n            SELECT \"code\"\n            FROM \"enrollmentStatus\"\n            WHERE lower(\"description\") LIKE (lower('".concat(status, "'));\n        "));

          case 5:
            dbCode = _context8.sent;

            if (!(dbCode[1].rowCount > 0)) {
              _context8.next = 10;
              break;
            }

            statusCode = parseInt(dbCode[0][0].code);
            _context8.next = 12;
            break;

          case 10:
            (0, _errors.returnWrongError)(res, 'Status Description', 'Status Code');
            return _context8.abrupt("return");

          case 12:
            if (statusCode === 1 || statusCode === 2 || statusCode === 3 || statusCode === 4 || statusCode === 5) {
              udpateQuery = "\n                    UPDATE \"enrollment\"\n                    SET \"statusID\" = (SELECT \"statusID\" FROM \"enrollmentStatus\" WHERE \"code\" = ".concat(statusCode, "),\n                        \"statusChangeDate\" = current_timestamp\n                    WHERE \"enrollmentID\" = ").concat(enrollmentID, ";    \n                ");
            } else {
              if (statusCode === 6 || statusCode === 7 || statusCode === 8 || statusCode === 9 || statusCode === 10 || statusCode === 11 || statusCode === 12) {
                udpateQuery = "\n                    UPDATE \"enrollment\"\n                    SET \"statusID\" = (SELECT \"statusID\" FROM \"enrollmentStatus\" WHERE \"code\" = ".concat(statusCode, "),\n                        \"statusChangeDate\" = current_timestamp,\n                        \"isActive\" = false,\n                        \"unregisteredDate\" = current_timestamp\n                    WHERE \"enrollmentID\" = ").concat(enrollmentID, ";\n                ");
              }
            }

            _context8.next = 15;
            return _database.sequelize.query(udpateQuery);

          case 15:
            _updateEnrollment3 = _context8.sent;

            if (!(_updateEnrollment3[1].rowCount > 0)) {
              _context8.next = 20;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Enrollment updated successfully'
            }));

          case 20:
            (0, _errors.returnNotFound)(res, 'Enrrollment ID');

          case 21:
            _context8.next = 27;
            break;

          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](2);
            console.log('Error', _context8.t0);
            return _context8.abrupt("return", res.status(500).json({
              error: _context8.t0
            }));

          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 23]]);
  }));
  return _updateProcessEnrollment.apply(this, arguments);
}

function deleteEnrollment(_x17, _x18) {
  return _deleteEnrollment.apply(this, arguments);
}

function _deleteEnrollment() {
  _deleteEnrollment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var enrollmentID, countDeleted;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            enrollmentID = req.params.enrollmentID;
            _context9.prev = 1;
            _context9.next = 4;
            return _Enrollment["default"].destroy({
              where: {
                enrollmentID: enrollmentID
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
              message: 'Enrollment deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Enrollment ID');

          case 10:
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            console.log('Error: ', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Delete Enrollment');

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return _deleteEnrollment.apply(this, arguments);
}