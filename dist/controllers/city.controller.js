"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCity = createCity;
exports.getCities = getCities;
exports.getCity = getCity;
exports.updateCity = updateCity;
exports.changeActivationCity = changeActivationCity;
exports.deleteCity = deleteCity;
exports.getCitiesCanton = getCitiesCanton;

var _City = _interopRequireDefault(require("../models/City"));

var _Canton = _interopRequireDefault(require("../models/Canton"));

var _Province = _interopRequireDefault(require("../models/Province"));

var _Country = _interopRequireDefault(require("../models/Country"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new City
function createCity(_x, _x2) {
  return _createCity.apply(this, arguments);
} // Get information about Cities


function _createCity() {
  _createCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, cityCode, cityName, cityDetail, cantonID, newCity;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, cityCode = _req$body.cityCode, cityName = _req$body.cityName, cityDetail = _req$body.cityDetail, cantonID = _req$body.cantonID;
            _context.prev = 1;
            _context.next = 4;
            return _City["default"].create({
              cityCode: cityCode,
              cityName: cityName,
              cityDetail: cityDetail,
              cantonID: cantonID
            }, {
              fields: ['cityCode', 'cityName', 'cityDetail', 'cantonID'],
              returning: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'unregisteredDate', 'cantonID']
            });

          case 4:
            newCity = _context.sent;

            if (!newCity) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'City created successfully',
              city: newCity
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create City');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createCity.apply(this, arguments);
}

function getCities(_x3, _x4) {
  return _getCities.apply(this, arguments);
} // Get information of a city


function _getCities() {
  _getCities = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, cities;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _City["default"].findAndCountAll({
              attributes: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'cantonID'],
              where: {
                isActive: true
              },
              include: [{
                model: _Canton["default"],
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital'],
                include: [{
                  model: _Province["default"],
                  attributes: ['provinceID', 'provinceCode', 'provinceName'],
                  include: [{
                    model: _Country["default"],
                    attributes: ['countryID', 'countryCode', 'countryName']
                  }]
                }]
              }],
              limit: limit,
              offset: from
            });

          case 5:
            cities = _context2.sent;

            if (!(cities.count > 0)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              cities: cities
            }));

          case 8:
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Cities');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));
  return _getCities.apply(this, arguments);
}

function getCity(_x5, _x6) {
  return _getCity.apply(this, arguments);
} // Update a city


function _getCity() {
  _getCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var cityID, city;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cityID = req.params.cityID;
            _context3.prev = 1;
            _context3.next = 4;
            return _City["default"].findOne({
              attributes: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'unregisteredDate', 'cantonID'],
              where: {
                cityID: cityID
              },
              include: [{
                model: _Canton["default"],
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital'],
                include: [{
                  model: _Province["default"],
                  attributes: ['provinceID', 'provinceCode', 'provinceName'],
                  include: [{
                    model: _Country["default"],
                    attributes: ['countryID', 'countryCode', 'countryName']
                  }]
                }]
              }]
            });

          case 4:
            city = _context3.sent;

            if (!city) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              city: city
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'City ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get City by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getCity.apply(this, arguments);
}

function updateCity(_x7, _x8) {
  return _updateCity.apply(this, arguments);
} // Change to active or inactive a city


function _updateCity() {
  _updateCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var cityID, _req$body2, cityCode, cityName, cityDetail, cantonID, dbCity, _updateCity2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cityID = req.params.cityID;
            _req$body2 = req.body, cityCode = _req$body2.cityCode, cityName = _req$body2.cityName, cityDetail = _req$body2.cityDetail, cantonID = _req$body2.cantonID;
            console.log('cityID: ', cityID);
            _context4.prev = 3;
            _context4.next = 6;
            return _City["default"].findOne({
              attributes: ['cityID', 'cityCode', 'cityName', 'cityDetail', 'isActive', 'registeredDate', 'unregisteredDate', 'cantonID'],
              where: {
                cityID: cityID
              }
            });

          case 6:
            dbCity = _context4.sent;

            if (!(dbCity === null || dbCity === undefined)) {
              _context4.next = 11;
              break;
            }

            (0, _errors.returnNotFound)(res, 'City ID');
            _context4.next = 19;
            break;

          case 11:
            _context4.next = 13;
            return _City["default"].update({
              cityCode: cityCode,
              cityName: cityName,
              cityDetail: cityDetail,
              cantonID: cantonID
            }, {
              where: {
                cityID: cityID
              }
            });

          case 13:
            _updateCity2 = _context4.sent;

            if (!_updateCity2) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              message: 'City updated successfully'
            }));

          case 18:
            (0, _errors.returnNotFound)(res, 'CityID');

          case 19:
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](3);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Update City');

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 21]]);
  }));
  return _updateCity.apply(this, arguments);
}

function changeActivationCity(_x9, _x10) {
  return _changeActivationCity.apply(this, arguments);
} // Delete a city


function _changeActivationCity() {
  _changeActivationCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var cityID, type, value, action, afirmation, negation, changeActivationJSON, dbCity, changeActivation;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cityID = req.params.cityID;
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
            return _City["default"].findOne({
              attributes: ['cityID', 'cityCode', 'cityName', 'isActive', 'registeredDate'],
              where: {
                cityID: cityID
              }
            });

          case 9:
            dbCity = _context5.sent;

            if (!dbCity) {
              _context5.next = 21;
              break;
            }

            _context5.next = 13;
            return _City["default"].update(changeActivationJSON, {
              where: {
                cityID: cityID,
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
              message: 'City ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a City or City already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context5.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'City ID');

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Change Activation City');

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 24]]);
  }));
  return _changeActivationCity.apply(this, arguments);
}

function deleteCity(_x11, _x12) {
  return _deleteCity.apply(this, arguments);
} // Get all cities of a Canton


function _deleteCity() {
  _deleteCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var cityID, countDeleted;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            cityID = req.params.cityID;
            _context6.prev = 1;
            _context6.next = 4;
            return _City["default"].destroy({
              where: {
                cityID: cityID
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
              message: 'City deleted successfuylly'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'City ID');

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Delete City');

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return _deleteCity.apply(this, arguments);
}

function getCitiesCanton(_x13, _x14) {
  return _getCitiesCanton.apply(this, arguments);
}

function _getCitiesCanton() {
  _getCitiesCanton = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var cantonID, cities;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            cantonID = req.params.cantonID; //const limit = req.query.limit || 25;
            //const from = req.query.from || 0;

            _context7.prev = 1;
            _context7.next = 4;
            return _City["default"].findAndCountAll({
              attributes: ['cityID', 'cityCode', 'cityName'],
              where: {
                isActive: true,
                cantonID: cantonID
              },
              include: [{
                model: _Canton["default"],
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital'],
                include: [{
                  model: _Province["default"],
                  attributes: ['provinceID', 'provinceCode', 'provinceName'],
                  include: [{
                    model: _Country["default"],
                    attributes: ['countryID', 'countryCode', 'countryName']
                  }]
                }]
              }]
            });

          case 4:
            cities = _context7.sent;

            if (!cities) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              cities: cities
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Canton ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Get Cities of Canton');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _getCitiesCanton.apply(this, arguments);
}