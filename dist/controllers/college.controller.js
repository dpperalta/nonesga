"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCollege = createCollege;
exports.getColleges = getColleges;
exports.changeActivationCollege = changeActivationCollege;
exports.getStatusColleges = getStatusColleges;
exports.getCollege = getCollege;
exports.updateCollege = updateCollege;
exports.deleteCollete = deleteCollete;

var _College = _interopRequireDefault(require("../models/College"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a college
function createCollege(_x, _x2) {
  return _createCollege.apply(this, arguments);
} // Get all colleges


function _createCollege() {
  _createCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, collegeName, collegeCode, collegeShowName, detail, image, logo, flag, description, newCollege;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, collegeName = _req$body.collegeName, collegeCode = _req$body.collegeCode, collegeShowName = _req$body.collegeShowName, detail = _req$body.detail, image = _req$body.image, logo = _req$body.logo, flag = _req$body.flag, description = _req$body.description;
            _context.prev = 1;
            _context.next = 4;
            return _College["default"].create({
              collegeName: collegeName,
              collegeCode: collegeCode,
              collegeShowName: collegeShowName,
              detail: detail,
              image: image,
              logo: logo,
              flag: flag,
              description: description,
              lastChangeDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              changeDetail: 'Create',
              status: 2
            }, {
              fields: ['collegeName', 'collegeCode', 'collegeShowName', 'detail', 'image', 'logo', 'flag', 'description', 'lastChangeDate', 'changeDetail', 'status'],
              returning: ['collegeID', 'collegeName', 'collegeCode', 'collegeShowName', 'detail', 'image', 'logo', 'flag', 'description', 'isActive', 'registratedDate', 'lastChangeDate', 'changeDetail']
            });

          case 4:
            newCollege = _context.sent;

            if (!newCollege) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'College created successfully',
              newCollege: newCollege
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create College');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createCollege.apply(this, arguments);
}

function getColleges(_x3, _x4) {
  return _getColleges.apply(this, arguments);
} // Change to active or inactive a college


function _getColleges() {
  _getColleges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, colleges;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _College["default"].findAndCountAll({
              attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour', 'status', 'isActive', 'image', 'logo', 'description', 'registratedDate', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'lastChangeUser'],
              limit: limit,
              offset: from
            });

          case 5:
            colleges = _context2.sent;

            if (!(colleges.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              colleges: colleges
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'All Colleges');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Colleges');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getColleges.apply(this, arguments);
}

function changeActivationCollege(_x5, _x6) {
  return _changeActivationCollege.apply(this, arguments);
} // Get all active or inactive college


function _changeActivationCollege() {
  _changeActivationCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var collegeID, type, value, action, afirmation, negation, changeActivationJSON, dbCollege, changeActivation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            collegeID = req.params.collegeID;
            type = req.query.type;
            action = '';
            afirmation = '';
            negation = '';

            if (type === 'Activate' || type === 'activate' || type === 'ACTIVATE') {
              value = true;
              action = 'Activating';
              negation = 'inactive';
              afirmation = 'active';
              changeActivationJSON = {
                isActive: value,
                lastChangeDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
                changeDetail: 'Set ' + afirmation
              };
            }

            if (type === 'Inactivate' || type === 'inactivate' || type === 'INACTIVATE') {
              value = false;
              action = 'Inactivating';
              negation = 'active';
              afirmation = 'inactive';
              changeActivationJSON = {
                isActive: value,
                unregistratedDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
                lastChangeDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
                changeDetail: 'Set ' + afirmation
              };
            }

            _context3.prev = 7;
            _context3.next = 10;
            return _College["default"].findOne({
              attributes: ['collegeName', 'isActive', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'collegeID'],
              where: {
                collegeID: collegeID
              }
            });

          case 10:
            dbCollege = _context3.sent;

            if (!dbCollege) {
              _context3.next = 23;
              break;
            }

            _context3.next = 14;
            return _College["default"].update(changeActivationJSON, {
              where: {
                collegeID: collegeID,
                isActive: !value
              }
            });

          case 14:
            changeActivation = _context3.sent;
            console.log("change activation:", changeActivation);

            if (!(changeActivation > 0)) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              message: 'College ' + type + 'd successfully'
            }));

          case 20:
            return _context3.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a College or College already ' + afirmation,
              error: 'Error 0'
            }));

          case 21:
            _context3.next = 24;
            break;

          case 23:
            (0, _errors.returnNotFound)(res, negation + " College");

          case 24:
            _context3.next = 30;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](7);
            console.log('Error');
            (0, _errors.returnError)(res, _context3.t0, "Activating/Inactivating College");

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[7, 26]]);
  }));
  return _changeActivationCollege.apply(this, arguments);
}

function getStatusColleges(_x7, _x8) {
  return _getStatusColleges.apply(this, arguments);
} // Get a college by ID


function _getStatusColleges() {
  _getStatusColleges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var type, value, limit, from, colleges;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            type = req.params.type;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            console.log('Type:', type);

            if (!(type === 'active')) {
              _context4.next = 8;
              break;
            }

            value = true;
            _context4.next = 13;
            break;

          case 8:
            if (!(type === 'inactive')) {
              _context4.next = 12;
              break;
            }

            value = false;
            _context4.next = 13;
            break;

          case 12:
            return _context4.abrupt("return", res.status(300).json({
              ok: false,
              message: 'The type is not correct, pealse validate'
            }));

          case 13:
            _context4.prev = 13;
            _context4.next = 16;
            return _College["default"].findAndCountAll({
              attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour', 'status', 'isActive', 'image', 'logo', 'description', 'registratedDate', 'unregistratedDate', 'lastChangeDate', 'changeDetail', 'lastChangeUser'],
              where: {
                isActive: value
              },
              limit: limit,
              offset: from
            });

          case 16:
            colleges = _context4.sent;

            if (!(colleges.count > 0)) {
              _context4.next = 21;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              colleges: colleges
            }));

          case 21:
            (0, _errors.returnNotFound)(res, type + ' colleges');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](13);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Active/Inactive Colleges');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[13, 24]]);
  }));
  return _getStatusColleges.apply(this, arguments);
}

function getCollege(_x9, _x10) {
  return _getCollege.apply(this, arguments);
} // Update a College by collegeID


function _getCollege() {
  _getCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var collegeID, college;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            collegeID = req.params.collegeID;
            _context5.prev = 1;
            _context5.next = 4;
            return _College["default"].findOne({
              attributes: ['collegeID', 'collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'logo', 'status', 'isActive', 'image', 'registratedDate', 'unregistratedDate', 'mainColour', 'secondaryColour', 'description', 'changeDetail', 'lastChangeDate', 'lastChangeUser'],
              where: {
                collegeID: collegeID
              }
            });

          case 4:
            college = _context5.sent;

            if (!college) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              college: college
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'College ID');

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get College ' + collegeID);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return _getCollege.apply(this, arguments);
}

function updateCollege(_x11, _x12) {
  return _updateCollege.apply(this, arguments);
} // Delete a college by college id


function _updateCollege() {
  _updateCollege = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var collegeID, _req$body2, collegeName, collegeShowName, collegeCode, detail, flag, mainColour, secondaryColour, status, image, logo, description, dbCollege, _updateCollege2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            collegeID = req.params.collegeID;
            _req$body2 = req.body, collegeName = _req$body2.collegeName, collegeShowName = _req$body2.collegeShowName, collegeCode = _req$body2.collegeCode, detail = _req$body2.detail, flag = _req$body2.flag, mainColour = _req$body2.mainColour, secondaryColour = _req$body2.secondaryColour, status = _req$body2.status, image = _req$body2.image, logo = _req$body2.logo, description = _req$body2.description;
            _context6.prev = 2;
            _context6.next = 5;
            return _College["default"].findOne({
              attributes: ['collegeName', 'collegeShowName', 'collegeCode', 'detail', 'flag', 'mainColour', 'secondaryColour', 'status', 'image', 'logo', 'description'],
              where: {
                collegeID: collegeID
              }
            });

          case 5:
            dbCollege = _context6.sent;

            if (!(dbCollege === null || dbCollege === undefined)) {
              _context6.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'College ID');
            _context6.next = 15;
            break;

          case 10:
            _context6.next = 12;
            return _College["default"].update({
              collegeName: collegeName,
              collegeShowName: collegeShowName,
              collegeCode: collegeCode,
              detail: detail,
              flag: flag,
              mainColour: mainColour,
              secondaryColour: secondaryColour,
              status: status,
              image: image,
              logo: logo,
              description: description,
              lastChangeDate: _database.sequelize.literal('CURRENT_TIMESTAMP'),
              changeDetail: 'Update College'
            }, {
              where: {
                collegeID: collegeID
              }
            });

          case 12:
            _updateCollege2 = _context6.sent;

            if (!_updateCollege2) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              message: 'College updated successfully',
              count: _updateCollege2
            }));

          case 15:
            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Update College');

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 17]]);
  }));
  return _updateCollege.apply(this, arguments);
}

function deleteCollete(_x13, _x14) {
  return _deleteCollete.apply(this, arguments);
}

function _deleteCollete() {
  _deleteCollete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var collegeID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            collegeID = req.params.collegeID;
            _context7.prev = 1;
            _context7.next = 4;
            return _College["default"].destroy({
              where: {
                collegeID: collegeID
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
              message: 'College deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'College ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Delete Collete');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deleteCollete.apply(this, arguments);
}