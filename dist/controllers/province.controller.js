"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProvince = createProvince;
exports.getProvinces = getProvinces;
exports.getProvince = getProvince;
exports.updateProvince = updateProvince;
exports.changeActivationProvince = changeActivationProvince;
exports.deleteProvince = deleteProvince;
exports.getProvincesCountry = getProvincesCountry;

var _Province = _interopRequireDefault(require("../models/Province"));

var _Country = _interopRequireDefault(require("../models/Country"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Province
function createProvince(_x, _x2) {
  return _createProvince.apply(this, arguments);
} // Get information about provinces


function _createProvince() {
  _createProvince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, provinceCode, provinceName, details, countryID, newProvince;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, provinceCode = _req$body.provinceCode, provinceName = _req$body.provinceName, details = _req$body.details, countryID = _req$body.countryID;
            _context.prev = 1;
            _context.next = 4;
            return _Province["default"].create({
              provinceCode: provinceCode,
              provinceName: provinceName,
              details: details,
              countryID: countryID
            }, {
              fields: ['provinceCode', 'provinceName', 'details', 'countryID'],
              returning: ['provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'countryID']
            });

          case 4:
            newProvince = _context.sent;

            if (!newProvince) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Province created successfully',
              province: newProvince
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Province');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createProvince.apply(this, arguments);
}

function getProvinces(_x3, _x4) {
  return _getProvinces.apply(this, arguments);
} // Get information of a province


function _getProvinces() {
  _getProvinces = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, provinces;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Province["default"].findAndCountAll({
              attributes: ['provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'countryID'],
              where: {
                isActive: true
              },
              include: [{
                model: _Country["default"],
                attributes: ['countryID', 'countryCode', 'countryName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            provinces = _context2.sent;

            if (!(provinces.count > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              provinces: provinces
            }));

          case 8:
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Provinces');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));
  return _getProvinces.apply(this, arguments);
}

function getProvince(_x5, _x6) {
  return _getProvince.apply(this, arguments);
} // Update a province


function _getProvince() {
  _getProvince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var provinceID, province;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            provinceID = req.params.provinceID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Province["default"].findOne({
              attributes: ['provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'countryID'],
              where: {
                provinceID: provinceID
              },
              include: [{
                model: _Country["default"],
                attributes: ['countryCode', 'countryName']
              }]
            });

          case 4:
            province = _context3.sent;

            if (!province) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              province: province
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Province ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Province by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getProvince.apply(this, arguments);
}

function updateProvince(_x7, _x8) {
  return _updateProvince.apply(this, arguments);
} // Change to active or inactive a province


function _updateProvince() {
  _updateProvince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var provinceID, _req$body2, provinceCode, provinceName, details, countryID, dbProvince, _updateProvince2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            provinceID = req.params.provinceID;
            _req$body2 = req.body, provinceCode = _req$body2.provinceCode, provinceName = _req$body2.provinceName, details = _req$body2.details, countryID = _req$body2.countryID;
            _context4.prev = 2;
            _context4.next = 5;
            return _Province["default"].findOne({
              attributes: ['provinceID', 'provinceCode', 'provinceName', 'details', 'isActive', 'registeredDate', 'unregisteredDate', 'countryID'],
              where: {
                provinceID: provinceID
              }
            });

          case 5:
            dbProvince = _context4.sent;

            if (!(dbProvince === null || dbProvince === undefined)) {
              _context4.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Province ID');
            _context4.next = 18;
            break;

          case 10:
            _context4.next = 12;
            return _Province["default"].update({
              provinceCode: provinceCode,
              provinceName: provinceName,
              details: details,
              countryID: countryID
            }, {
              where: {
                provinceID: provinceID
              }
            });

          case 12:
            _updateProvince2 = _context4.sent;

            if (!_updateProvince2) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Province updated successfully'
            }));

          case 17:
            (0, _errors.returnNotFound)(res, 'ProvinceID');

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](2);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update Province');

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 20]]);
  }));
  return _updateProvince.apply(this, arguments);
}

function changeActivationProvince(_x9, _x10) {
  return _changeActivationProvince.apply(this, arguments);
} // Delete a province


function _changeActivationProvince() {
  _changeActivationProvince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var provinceID, type, value, action, afirmation, negation, changeActivationJSON, dbProvince, changeActivation;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            provinceID = req.params.provinceID;
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

            _context5.prev = 6;
            _context5.next = 9;
            return _Province["default"].findOne({
              attributes: ['provinceID', 'provinceCode', 'provinceName', 'isActive', 'registeredDate'],
              where: {
                provinceID: provinceID
              }
            });

          case 9:
            dbProvince = _context5.sent;

            if (!dbProvince) {
              _context5.next = 21;
              break;
            }

            _context5.next = 13;
            return _Province["default"].update(changeActivationJSON, {
              where: {
                provinceID: provinceID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context5.sent;

            if (!(changeActivation > 0)) {
              _context5.next = 18;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Province ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Province or Province already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context5.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Province ID');

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Change Activation Province');

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 24]]);
  }));
  return _changeActivationProvince.apply(this, arguments);
}

function deleteProvince(_x11, _x12) {
  return _deleteProvince.apply(this, arguments);
} // Get all provinces of a country


function _deleteProvince() {
  _deleteProvince = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var provinceID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            provinceID = req.params.provinceID;
            _context6.prev = 1;
            _context6.next = 4;
            return _Province["default"].destroy({
              where: {
                provinceID: provinceID
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
              message: 'Province deleted successfuylly'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Province ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete Province');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteProvince.apply(this, arguments);
}

function getProvincesCountry(_x13, _x14) {
  return _getProvincesCountry.apply(this, arguments);
}

function _getProvincesCountry() {
  _getProvincesCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var countryID, provinces;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            countryID = req.params.countryID; //const limit = req.query.limit || 25;
            //const from = req.query.from || 0;

            _context7.prev = 1;
            _context7.next = 4;
            return _Province["default"].findAndCountAll({
              attributes: ['provinceID', 'provinceCode', 'provinceName'],
              where: {
                isActive: true,
                countryID: countryID
              },
              include: [{
                model: _Country["default"],
                attributes: ['countryID', 'countryName']
              }] //,
              //limit,
              //offset: from

            });

          case 4:
            provinces = _context7.sent;

            if (!provinces) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              provinces: provinces
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Country ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Get Provinces of Contry');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _getProvincesCountry.apply(this, arguments);
}