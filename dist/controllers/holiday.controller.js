"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHoliday = createHoliday;
exports.getHolidays = getHolidays;
exports.getHoliday = getHoliday;
exports.searchHolidayByNameOrDetail = searchHolidayByNameOrDetail;
exports.searchHolidayByLocation = searchHolidayByLocation;
exports.searchHolidayByDate = searchHolidayByDate;
exports.getNationalHolidays = getNationalHolidays;
exports.updateHoliday = updateHoliday;
exports.changeActivationHoliday = changeActivationHoliday;
exports.deleteHoliday = deleteHoliday;

var _Holiday = _interopRequireDefault(require("../models/Holiday"));

var _Country = _interopRequireDefault(require("../models/Country"));

var _Province = _interopRequireDefault(require("../models/Province"));

var _Canton = _interopRequireDefault(require("../models/Canton"));

var _City = _interopRequireDefault(require("../models/City"));

var _errors = require("./errors");

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Holiday
function createHoliday(_x, _x2) {
  return _createHoliday.apply(this, arguments);
} // Get all Holidays


function _createHoliday() {
  _createHoliday = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, date, details, isNational, isOptional, isReprogramed, reprogramedDate, countryID, provinceID, cantonID, cityID, country, province, canton, city, newHolidayDate, newHoliday;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, date = _req$body.date, details = _req$body.details, isNational = _req$body.isNational, isOptional = _req$body.isOptional, isReprogramed = _req$body.isReprogramed, reprogramedDate = _req$body.reprogramedDate, countryID = _req$body.countryID, provinceID = _req$body.provinceID, cantonID = _req$body.cantonID, cityID = _req$body.cityID;

            if (isNational === true) {
              country = countryID;
              province = null;
              canton = null;
              city = null;
            } else {
              country = countryID;
              province = provinceID;
              canton = cantonID;
              city = cityID;
            }

            if (!(isReprogramed === true)) {
              _context.next = 10;
              break;
            }

            if (!(reprogramedDate === undefined || reprogramedDate === null)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: false,
              message: 'Important field required - Reprogramed Date'
            }));

          case 7:
            newHolidayDate = reprogramedDate;

          case 8:
            _context.next = 11;
            break;

          case 10:
            newHolidayDate = null;

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return _Holiday["default"].create({
              name: name,
              date: date,
              details: details,
              isNational: isNational,
              isOptional: isOptional,
              isReprogramed: isReprogramed,
              reprogramedDate: newHolidayDate,
              countryID: country,
              provinceID: province,
              cantonID: canton,
              cityID: city
            }, {
              fields: ['name', 'date', 'details', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
              returning: ['holidayID', 'name', 'date', 'details', 'registeredDate', 'unregisteredDate', 'isActive', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID']
            });

          case 14:
            newHoliday = _context.sent;

            if (!newHoliday) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Holiday created successfully',
              holiday: newHoliday
            }));

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](11);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Holiday');

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 19]]);
  }));
  return _createHoliday.apply(this, arguments);
}

function getHolidays(_x3, _x4) {
  return _getHolidays.apply(this, arguments);
} // Get a Holiday by ID


function _getHolidays() {
  _getHolidays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, holidays;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Holiday["default"].findAndCountAll({
              attributes: ['holidayID', 'name', 'details', 'date', 'registeredDate', 'unregisteredDate', 'isActive', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
              include: [{
                model: _Country["default"],
                attributes: ['countryID', 'countryCode', 'countryName']
              }, {
                model: _Province["default"],
                attributes: ['provinceID', 'provinceCode', 'provinceName']
              }, {
                model: _Canton["default"],
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital']
              }, {
                model: _City["default"],
                attributes: ['cityID', 'cityCode', 'cityName']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            holidays = _context2.sent;

            if (!(holidays.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              holidays: holidays
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Holiday');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get all Holidays');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getHolidays.apply(this, arguments);
}

function getHoliday(_x5, _x6) {
  return _getHoliday.apply(this, arguments);
} // Get all Holidays by name


function _getHoliday() {
  _getHoliday = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var holidayID, holiday;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            holidayID = req.params.holidayID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Holiday["default"].findOne({
              attributes: ['holidayID', 'name', 'details', 'date', 'registeredDate', 'unregisteredDate', 'isActive', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
              where: {
                holidayID: holidayID
              },
              include: [{
                model: _Country["default"],
                attributes: ['countryID', 'countryCode', 'countryName']
              }, {
                model: _Province["default"],
                attributes: ['provinceID', 'provinceCode', 'provinceName']
              }, {
                model: _Canton["default"],
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital']
              }, {
                model: _City["default"],
                attributes: ['cityID', 'cityCode', 'cityName']
              }]
            });

          case 4:
            holiday = _context3.sent;

            if (!holiday) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              holiday: holiday
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Holiday ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get a Holiday by ID');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getHoliday.apply(this, arguments);
}

function searchHolidayByNameOrDetail(_x7, _x8) {
  return _searchHolidayByNameOrDetail.apply(this, arguments);
} // Get all Holidays by location


function _searchHolidayByNameOrDetail() {
  _searchHolidayByNameOrDetail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var limit, from, name, details, active, queryString, activeQuery, counter, total, holidays;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            name = req.query.name;
            details = req.query.details;
            active = req.query.active;
            queryString = '';

            if (active === undefined || active === null) {
              activeQuery = '';
            } else {
              activeQuery = "AND ho.\"isActive\" = ".concat(active);
            }

            if (!(name === undefined && details === undefined)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Name or Details for search are required'
            }));

          case 9:
            if (name !== undefined || details !== undefined) {
              console.log(name, ' || ', details);

              if (name !== undefined && details !== undefined) {
                queryString = "WHERE (LOWER(ho.\"name\") LIKE LOWER('%".concat(name.trim(), "%') OR LOWER(ho.\"details\") LIKE LOWER('%").concat(details.trim(), "%'))");
              } else {
                if (name !== undefined) {
                  queryString = "WHERE LOWER(ho.\"name\") LIKE LOWER('%".concat(name.trim(), "%')");
                } else {
                  queryString = "WHERE LOWER(ho.\"details\") LIKE LOWER('%".concat(details.trim(), "%')");
                }
              }
            }

            _context4.prev = 10;
            _context4.next = 13;
            return _database.sequelize.query("\n            SELECT\tCOUNT (*)\n            FROM  \"holiday\" ho\n                INNER JOIN \"country\" co ON co.\"countryID\" = ho.\"countryID\"\n                LEFT OUTER JOIN \"province\" pr ON pr.\"provinceID\" = ho.\"provinceID\"\n                LEFT OUTER JOIN \"canton\" ca ON ca.\"cantonID\" = ho.\"cantonID\"\n                LEFT OUTER JOIN \"city\" ci ON ci.\"cityID\" = ho.\"cityID\"\n                ".concat(queryString, "\n                ").concat(activeQuery, "     \n        "));

          case 13:
            counter = _context4.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context4.next = 26;
              break;
            }

            _context4.next = 18;
            return _database.sequelize.query("\n                SELECT \tho.\"holidayID\" identificator,\n                        ho.\"name\" holidayName,\n                        ho.\"date\" holidayDate,\n                        ho.\"details\" holidayDetails,\n                        ho.\"registeredDate\" registration,\n                        ho.\"unregisteredDate\" unregistration,\n                        ho.\"isActive\" active,\n                        ho.\"isNational\" nationalHoliday,\n                        ho.\"isOptional\" optional,\n                        ho.\"isReprogramed\" reprogramed,\n                        ho.\"reprogramedDate\" reprogramedDate,\n                        co.\"countryID\" country,\n                        co.\"countryCode\" codeCountry,\n                        co.\"countryName\" nameCountry,\n                        pr.\"provinceID\" province,\n                        pr.\"provinceCode\" codeProvince,\n                        pr.\"provinceName\" nameProvince,\n                        ca.\"cantonID\" canton,\n                        ca.\"cantonCode\" codeCanton,\n                        ca.\"cantonName\" nameCanton,\n                        ca.\"capital\" capitalCanton,\n                        ci.\"cityID\" city,\n                        ci.\"cityCode\" codeCity,\n                        ci.\"cityName\" nameCity\n                FROM  \"holiday\" ho\n                INNER JOIN \"country\" co ON co.\"countryID\" = ho.\"countryID\"\n                LEFT OUTER JOIN \"province\" pr ON pr.\"provinceID\" = ho.\"provinceID\"\n                LEFT OUTER JOIN \"canton\" ca ON ca.\"cantonID\" = ho.\"cantonID\"\n                LEFT OUTER JOIN \"city\" ci ON ci.\"cityID\" = ho.\"cityID\"\n                ".concat(queryString, "\n                ").concat(activeQuery, "\n                ORDER BY ho.\"date\"\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, "\n            "));

          case 18:
            holidays = _context4.sent;

            if (!holidays) {
              _context4.next = 23;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              holidays: holidays[0],
              count: total
            }));

          case 23:
            (0, _errors.returnNotFound)(res, 'Holiday');

          case 24:
            _context4.next = 27;
            break;

          case 26:
            (0, _errors.returnNotFound)(res, 'Holiday');

          case 27:
            _context4.next = 33;
            break;

          case 29:
            _context4.prev = 29;
            _context4.t0 = _context4["catch"](10);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Holiday by name');

          case 33:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[10, 29]]);
  }));
  return _searchHolidayByNameOrDetail.apply(this, arguments);
}

function searchHolidayByLocation(_x9, _x10) {
  return _searchHolidayByLocation.apply(this, arguments);
} // Get all Holidays by date (format date yyyy-mm-dd -> year-month-day)


function _searchHolidayByLocation() {
  _searchHolidayByLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var country, province, canton, city, limit, from, active, queryString, queryActive, counter, total, holidays;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            country = req.query.country;
            province = req.query.province;
            canton = req.query.canton;
            city = req.query.city;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            active = req.query.active;
            queryString = '';
            active ? queryActive = "AND ho.\"isActive\" = ".concat(active) : queryActive = '';

            if (!(country !== undefined)) {
              _context5.next = 16;
              break;
            }

            queryString = "WHERE LOWER(co.\"countryName\") LIKE LOWER('%".concat(country.trim(), "%')");

            if (province !== undefined) {
              queryString = queryString + " AND LOWER(pr.\"provinceName\") LIKE LOWER('%".concat(province.trim(), "%')");
            }

            if (canton !== undefined) {
              queryString = queryString + " AND LOWER(ca.\"cantonName\") LIKE LOWER('%".concat(canton.trim(), "%')");
            }

            if (city !== undefined) {
              queryString = queryString + " AND LOWER(ci.\"cityName\") LIKE LOWER('%".concat(city.trim(), "%')");
            }

            _context5.next = 17;
            break;

          case 16:
            return _context5.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Required values not found - Country'
            }));

          case 17:
            console.log('QueryString', queryString);
            _context5.prev = 18;
            _context5.next = 21;
            return _database.sequelize.query("\n            SELECT\tCOUNT (*)\n            FROM  \"holiday\" ho\n                INNER JOIN \"country\" co ON co.\"countryID\" = ho.\"countryID\"\n                LEFT OUTER JOIN \"province\" pr ON pr.\"provinceID\" = ho.\"provinceID\"\n                LEFT OUTER JOIN \"canton\" ca ON ca.\"cantonID\" = ho.\"cantonID\"\n                LEFT OUTER JOIN \"city\" ci ON ci.\"cityID\" = ho.\"cityID\"\n                ".concat(queryString, "\n                ").concat(queryActive, "     \n        "));

          case 21:
            counter = _context5.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context5.next = 34;
              break;
            }

            _context5.next = 26;
            return _database.sequelize.query("\n                SELECT \tho.\"holidayID\" identificator,\n                        ho.\"name\" holidayName,\n                        ho.\"date\" holidayDate,\n                        ho.\"details\" holidayDetails,\n                        ho.\"registeredDate\" registration,\n                        ho.\"unregisteredDate\" unregistration,\n                        ho.\"isActive\" active,\n                        ho.\"isNational\" nationalHoliday,\n                        ho.\"isOptional\" optional,\n                        ho.\"isReprogramed\" reprogramed,\n                        ho.\"reprogramedDate\" reprogramedDate,\n                        co.\"countryID\" country,\n                        co.\"countryCode\" codeCountry,\n                        co.\"countryName\" nameCountry,\n                        pr.\"provinceID\" province,\n                        pr.\"provinceCode\" codeProvince,\n                        pr.\"provinceName\" nameProvince,\n                        ca.\"cantonID\" canton,\n                        ca.\"cantonCode\" codeCanton,\n                        ca.\"cantonName\" nameCanton,\n                        ca.\"capital\" capitalCanton,\n                        ci.\"cityID\" city,\n                        ci.\"cityCode\" codeCity,\n                        ci.\"cityName\" nameCity\n                FROM  \"holiday\" ho\n                INNER JOIN \"country\" co ON co.\"countryID\" = ho.\"countryID\"\n                LEFT OUTER JOIN \"province\" pr ON pr.\"provinceID\" = ho.\"provinceID\"\n                LEFT OUTER JOIN \"canton\" ca ON ca.\"cantonID\" = ho.\"cantonID\"\n                LEFT OUTER JOIN \"city\" ci ON ci.\"cityID\" = ho.\"cityID\"\n                ".concat(queryString, "\n                ").concat(queryActive, "\n                ORDER BY ho.\"date\"\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, "\n            "));

          case 26:
            holidays = _context5.sent;

            if (!holidays) {
              _context5.next = 31;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              holidays: holidays[0],
              count: total
            }));

          case 31:
            (0, _errors.returnNotFound)(res, 'Holiday');

          case 32:
            _context5.next = 35;
            break;

          case 34:
            (0, _errors.returnNotFound)(res, 'Holiday');

          case 35:
            _context5.next = 41;
            break;

          case 37:
            _context5.prev = 37;
            _context5.t0 = _context5["catch"](18);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Holiday by Location');

          case 41:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[18, 37]]);
  }));
  return _searchHolidayByLocation.apply(this, arguments);
}

function searchHolidayByDate(_x11, _x12) {
  return _searchHolidayByDate.apply(this, arguments);
} // Get all national or local Holidays


function _searchHolidayByDate() {
  _searchHolidayByDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var limit, from, firstDate, secondDate, active, national, queryString, queryActive, queryNational, counter, total, holidays;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            firstDate = req.query.firstDate;
            secondDate = req.query.secondDate;
            active = req.query.active;
            national = req.query.national;
            queryString = '';
            active ? queryActive = "AND ho.\"isActive\" = ".concat(active) : queryActive = '';
            national ? queryNational = "AND ho.\"isNational\" = ".concat(national, " ") : queryNational = '';

            if (!(firstDate === undefined && secondDate === undefined)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'At least one date is required to search a Holiday'
            }));

          case 11:
            if (firstDate !== undefined || secondDate !== undefined) {
              if (firstDate !== undefined && secondDate !== undefined) {
                queryString = "WHERE ho.\"date\" BETWEEN to_date('".concat(firstDate, "', 'yyyy-mm-dd') AND to_date('").concat(secondDate, "', 'yyyy-mm-dd')");
              } else {
                queryString = "WHERE ho.\"date\" = to_date('".concat(firstDate, "', 'yyyy-mm-dd')");
              }
            }

            _context6.prev = 12;
            _context6.next = 15;
            return _database.sequelize.query("\n            SELECT\tCOUNT (*)\n            FROM  \"holiday\" ho\n                INNER JOIN \"country\" co ON co.\"countryID\" = ho.\"countryID\"\n                LEFT OUTER JOIN \"province\" pr ON pr.\"provinceID\" = ho.\"provinceID\"\n                LEFT OUTER JOIN \"canton\" ca ON ca.\"cantonID\" = ho.\"cantonID\"\n                LEFT OUTER JOIN \"city\" ci ON ci.\"cityID\" = ho.\"cityID\"\n                ".concat(queryString, "\n                ").concat(queryNational, "\n                ").concat(queryActive, "\n        "));

          case 15:
            counter = _context6.sent;
            total = counter[1].rows[0].count;

            if (!(total > 0)) {
              _context6.next = 29;
              break;
            }

            _context6.next = 20;
            return _database.sequelize.query("\n                SELECT \tho.\"holidayID\" identificator,\n                        ho.\"name\" holidayName,\n                        ho.\"date\" holidayDate,\n                        ho.\"details\" holidayDetails,\n                        ho.\"registeredDate\" registration,\n                        ho.\"unregisteredDate\" unregistration,\n                        ho.\"isActive\" active,\n                        ho.\"isNational\" nationalHoliday,\n                        ho.\"isOptional\" optional,\n                        ho.\"isReprogramed\" reprogramed,\n                        ho.\"reprogramedDate\" reprogramedDate,\n                        co.\"countryID\" country,\n                        co.\"countryCode\" codeCountry,\n                        co.\"countryName\" nameCountry,\n                        pr.\"provinceID\" province,\n                        pr.\"provinceCode\" codeProvince,\n                        pr.\"provinceName\" nameProvince,\n                        ca.\"cantonID\" canton,\n                        ca.\"cantonCode\" codeCanton,\n                        ca.\"cantonName\" nameCanton,\n                        ca.\"capital\" capitalCanton,\n                        ci.\"cityID\" city,\n                        ci.\"cityCode\" codeCity,\n                        ci.\"cityName\" nameCity\n                FROM  \"holiday\" ho\n                INNER JOIN \"country\" co ON co.\"countryID\" = ho.\"countryID\"\n                LEFT OUTER JOIN \"province\" pr ON pr.\"provinceID\" = ho.\"provinceID\"\n                LEFT OUTER JOIN \"canton\" ca ON ca.\"cantonID\" = ho.\"cantonID\"\n                LEFT OUTER JOIN \"city\" ci ON ci.\"cityID\" = ho.\"cityID\"\n                ".concat(queryString, "\n                ").concat(queryNational, "\n                ").concat(queryActive, "\n                ORDER BY ho.\"date\"\n                LIMIT ").concat(limit, "\n                OFFSET ").concat(from, "\n            "));

          case 20:
            holidays = _context6.sent;

            if (!holidays) {
              _context6.next = 25;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              holidays: holidays[0],
              count: total
            }));

          case 25:
            console.log(queryString);
            (0, _errors.returnNotFound)(res, 'Holiday');

          case 27:
            _context6.next = 31;
            break;

          case 29:
            console.log('query 2:', queryString);
            (0, _errors.returnNotFound)(res, 'Holiday');

          case 31:
            _context6.next = 37;
            break;

          case 33:
            _context6.prev = 33;
            _context6.t0 = _context6["catch"](12);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Holiday by name');

          case 37:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[12, 33]]);
  }));
  return _searchHolidayByDate.apply(this, arguments);
}

function getNationalHolidays(_x13, _x14) {
  return _getNationalHolidays.apply(this, arguments);
} // Update a Holiday


function _getNationalHolidays() {
  _getNationalHolidays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var countryID, limit, from, national, holidays;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            countryID = req.params.countryID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            national = req.query.national || true;
            _context7.prev = 4;
            _context7.next = 7;
            return _Holiday["default"].findAndCountAll({
              attributes: ['holidayID', 'name', 'details', 'date', 'registeredDate', 'unregisteredDate', 'isActive', 'isNational', 'isOptional', 'isReprogramed', 'reprogramedDate', 'countryID', 'provinceID', 'cantonID', 'cityID'],
              where: {
                countryID: countryID,
                isNational: national
              },
              include: [{
                model: _Country["default"],
                attributes: ['countryID', 'countryCode', 'countryName']
              }, {
                model: _Province["default"],
                attributes: ['provinceID', 'provinceCode', 'provinceName']
              }, {
                model: _Canton["default"],
                attributes: ['cantonID', 'cantonCode', 'cantonName', 'capital']
              }, {
                model: _City["default"],
                attributes: ['cityID', 'cityCode', 'cityName']
              }],
              limit: limit,
              offset: from
            });

          case 7:
            holidays = _context7.sent;

            if (!(holidays.count > 0)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              holidays: holidays
            }));

          case 12:
            (0, _errors.returnNotFound)(res, 'Country ID');

          case 13:
            _context7.next = 19;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](4);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Get all Holidays by Country');

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 15]]);
  }));
  return _getNationalHolidays.apply(this, arguments);
}

function updateHoliday(_x15, _x16) {
  return _updateHoliday.apply(this, arguments);
} // Change to active or inactive a Holiday


function _updateHoliday() {
  _updateHoliday = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var holidayID, _req$body2, name, details, date, isNational, isOptional, isReprogramed, reprogramedDate, countryID, provinceID, cantonID, cityID, dbHoliday, updatedHoliday;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            holidayID = req.params.holidayID;
            _req$body2 = req.body, name = _req$body2.name, details = _req$body2.details, date = _req$body2.date, isNational = _req$body2.isNational, isOptional = _req$body2.isOptional, isReprogramed = _req$body2.isReprogramed, reprogramedDate = _req$body2.reprogramedDate, countryID = _req$body2.countryID, provinceID = _req$body2.provinceID, cantonID = _req$body2.cantonID, cityID = _req$body2.cityID;
            console.log('body', req.body);
            _context8.prev = 3;
            _context8.next = 6;
            return _Holiday["default"].findOne({
              attributes: ['holidayID', 'name', 'details', 'date'],
              where: {
                holidayID: holidayID
              }
            });

          case 6:
            dbHoliday = _context8.sent;
            console.log('response:', dbHoliday);

            if (!(dbHoliday === null || dbHoliday === undefined)) {
              _context8.next = 12;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Holiday ID');
            _context8.next = 20;
            break;

          case 12:
            _context8.next = 14;
            return _Holiday["default"].update({
              name: name,
              details: details,
              date: date,
              isNational: isNational,
              isOptional: isOptional,
              isReprogramed: isReprogramed,
              reprogramedDate: reprogramedDate,
              countryID: countryID,
              provinceID: provinceID,
              cantonID: cantonID,
              cityID: cityID
            }, {
              where: {
                holidayID: holidayID
              }
            });

          case 14:
            updatedHoliday = _context8.sent;

            if (!updatedHoliday) {
              _context8.next = 19;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Holiday updated successfully'
            }));

          case 19:
            (0, _errors.returnNotFound)(res, 'Holiday ID');

          case 20:
            _context8.next = 26;
            break;

          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](3);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Update a Holiday');

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[3, 22]]);
  }));
  return _updateHoliday.apply(this, arguments);
}

function changeActivationHoliday(_x17, _x18) {
  return _changeActivationHoliday.apply(this, arguments);
} // Delete a Holiday


function _changeActivationHoliday() {
  _changeActivationHoliday = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var holidayID, type, value, action, afirmation, negation, changeActivationJSON, dbHoliday, changeActivation;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            holidayID = req.params.holidayID;
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

            _context9.prev = 6;
            _context9.next = 9;
            return _Holiday["default"].findOne({
              attributes: ['holidayID', 'name', 'details', 'date', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                holidayID: holidayID
              }
            });

          case 9:
            dbHoliday = _context9.sent;

            if (!dbHoliday) {
              _context9.next = 21;
              break;
            }

            _context9.next = 13;
            return _Holiday["default"].update(changeActivationJSON, {
              where: {
                holidayID: holidayID,
                isActive: !value
              }
            });

          case 13:
            changeActivation = _context9.sent;

            if (!(changeActivation > 0)) {
              _context9.next = 18;
              break;
            }

            return _context9.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Holiday ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context9.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' a Holiday or Holiday already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context9.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Holiday ID');

          case 22:
            _context9.next = 28;
            break;

          case 24:
            _context9.prev = 24;
            _context9.t0 = _context9["catch"](6);
            console.log('Error:', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Change Activation Holiday');

          case 28:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[6, 24]]);
  }));
  return _changeActivationHoliday.apply(this, arguments);
}

function deleteHoliday(_x19, _x20) {
  return _deleteHoliday.apply(this, arguments);
}

function _deleteHoliday() {
  _deleteHoliday = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var holidayID, countDeleted;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            holidayID = req.params.holidayID;
            _context10.prev = 1;
            _context10.next = 4;
            return _Holiday["default"].destroy({
              where: {
                holidayID: holidayID
              }
            });

          case 4:
            countDeleted = _context10.sent;

            if (!(countDeleted > 0)) {
              _context10.next = 9;
              break;
            }

            return _context10.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Holiday deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Holiday ID');

          case 10:
            _context10.next = 16;
            break;

          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](1);
            console.log('Error:', _context10.t0);
            (0, _errors.returnError)(res, _context10.t0, 'Delete Holiday');

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 12]]);
  }));
  return _deleteHoliday.apply(this, arguments);
}