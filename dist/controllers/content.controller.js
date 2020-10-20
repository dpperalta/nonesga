"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContent = createContent;
exports.getAllContent = getAllContent;
exports.getContentBySubject = getContentBySubject;
exports.changeActivationContent = changeActivationContent;
exports.updateContent = updateContent;
exports.deleteContent = deleteContent;

var _Content = _interopRequireDefault(require("../models/Content"));

var _database = require("../database/database");

var _errors = require("./errors");

var _Subject = _interopRequireDefault(require("../models/Subject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create new Content
function createContent(_x, _x2) {
  return _createContent.apply(this, arguments);
} // Get all content


function _createContent() {
  _createContent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, contentCode, contentTitle, contentDetail, image, subjectID, newContent;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, contentCode = _req$body.contentCode, contentTitle = _req$body.contentTitle, contentDetail = _req$body.contentDetail, image = _req$body.image, subjectID = _req$body.subjectID;
            _context.prev = 1;
            _context.next = 4;
            return _Content["default"].create({
              contentCode: contentCode,
              contentTitle: contentTitle,
              contentDetail: contentDetail,
              image: image,
              subjectID: subjectID
            }, {
              fields: ['contentCode', 'contentTitle', 'contentDetail', 'image', 'subjectID'],
              returning: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'registeredDate', 'unregisteredDate', 'image', 'isActive', 'subjectID']
            });

          case 4:
            newContent = _context.sent;

            if (!newContent) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Content created successfully',
              content: newContent
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Content');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createContent.apply(this, arguments);
}

function getAllContent(_x3, _x4) {
  return _getAllContent.apply(this, arguments);
} // Get all content from a subject


function _getAllContent() {
  _getAllContent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, contents;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Content["default"].findAndCountAll({
              attributes: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'registeredDate', 'unregisteredDate', 'isActive', 'image', 'subjectID'],
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            contents = _context2.sent;

            if (!contents) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              contents: contents
            }));

          case 10:
            return _context2.abrupt("return", (0, _errors.returnNotFound)(res, 'Any Content'));

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get All Content');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getAllContent.apply(this, arguments);
}

function getContentBySubject(_x5, _x6) {
  return _getContentBySubject.apply(this, arguments);
} // Get all content from a course
// Activate/Inactivate content


function _getContentBySubject() {
  _getContentBySubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var subjectID, limit, from, contents;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subjectID = req.params.subjectID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context3.prev = 3;
            _context3.next = 6;
            return _Content["default"].findAndCountAll({
              attributes: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'registeredDate', 'unregisteredDate', 'isActive', 'image', 'subjectID'],
              where: {
                subjectID: subjectID
              },
              include: [{
                model: _Subject["default"],
                attributes: ['subjectID', 'subjectName']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            contents = _context3.sent;

            if (!contents) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              contents: contents
            }));

          case 11:
            return _context3.abrupt("return", (0, _errors.returnNotFound)(res, 'Any Content'));

          case 12:
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get All Content');

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 14]]);
  }));
  return _getContentBySubject.apply(this, arguments);
}

function changeActivationContent(_x7, _x8) {
  return _changeActivationContent.apply(this, arguments);
} // Update Content 


function _changeActivationContent() {
  _changeActivationContent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var contentID, type, value, action, afirmation, negation, changeActivationJSON, dbContent, changeActivation;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            contentID = req.params.contentID;
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

            _context4.prev = 6;
            _context4.next = 9;
            return _Content["default"].findOne({
              attributes: ['contentID', 'contentCode', 'contentTitle', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                contentID: contentID
              }
            });

          case 9:
            dbContent = _context4.sent;

            if (!dbContent) {
              _context4.next = 21;
              break;
            }

            _context4.next = 13;
            return _Content["default"].update(changeActivationJSON, {
              where: {
                contentID: contentID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context4.sent;

            if (!(changeActivation > 0)) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Conent ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Content or Content already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context4.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Content ID');

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](6);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Change Activation Content');

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 24]]);
  }));
  return _changeActivationContent.apply(this, arguments);
}

function updateContent(_x9, _x10) {
  return _updateContent.apply(this, arguments);
} // Delete Content


function _updateContent() {
  _updateContent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var contentID, _req$body2, contentCode, contentTitle, contentDetail, image, subjectID, dbContent, updatedContent;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            contentID = req.params.contentID;
            _req$body2 = req.body, contentCode = _req$body2.contentCode, contentTitle = _req$body2.contentTitle, contentDetail = _req$body2.contentDetail, image = _req$body2.image, subjectID = _req$body2.subjectID;
            _context5.prev = 2;
            _context5.next = 5;
            return _Content["default"].findOne({
              attributes: ['contentID', 'contentCode', 'contentTitle', 'contentDetail', 'isActive', 'registeredDate', 'subjectID'],
              where: {
                contentID: contentID
              }
            });

          case 5:
            dbContent = _context5.sent;

            if (!(dbContent === null || dbContent === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Content ID');
            _context5.next = 18;
            break;

          case 10:
            _context5.next = 12;
            return _Content["default"].update({
              contentCode: contentCode,
              contentTitle: contentTitle,
              contentDetail: contentDetail,
              image: image,
              subjectID: subjectID
            }, {
              where: {
                contentID: contentID
              }
            });

          case 12:
            updatedContent = _context5.sent;

            if (!updateContent) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Content Updated Successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'Content ID');

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Content');

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateContent.apply(this, arguments);
}

function deleteContent(_x11, _x12) {
  return _deleteContent.apply(this, arguments);
}

function _deleteContent() {
  _deleteContent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var contentID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            contentID = req.params.contentID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Content["default"].destroy({
              where: {
                contentID: contentID
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
              message: 'Content deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Content ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Content');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteContent.apply(this, arguments);
}