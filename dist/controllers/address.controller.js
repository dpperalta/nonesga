"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAddress = createAddress;
exports.getAddresses = getAddresses;
exports.getAddress = getAddress;
exports.getAddressPerson = getAddressPerson;
exports.updateAddress = updateAddress;
exports.changeActivationAddress = changeActivationAddress;
exports.deleteAddress = deleteAddress;

var _Address = _interopRequireDefault(require("../models/Address"));

var _City = _interopRequireDefault(require("../models/City"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a new Address
function createAddress(_x, _x2) {
  return _createAddress.apply(this, arguments);
} // Get all the information of addresses whit pagination


function _createAddress() {
  _createAddress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, addressName, mainStreet, number, secondStreet, references, zipCode, latitude, longitude, addressType, isFavourite, cityID, personID, newAddress;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, addressName = _req$body.addressName, mainStreet = _req$body.mainStreet, number = _req$body.number, secondStreet = _req$body.secondStreet, references = _req$body.references, zipCode = _req$body.zipCode, latitude = _req$body.latitude, longitude = _req$body.longitude, addressType = _req$body.addressType, isFavourite = _req$body.isFavourite, cityID = _req$body.cityID, personID = _req$body.personID;
            _context.prev = 1;
            _context.next = 4;
            return _Address["default"].create({
              addressName: addressName,
              mainStreet: mainStreet,
              number: number,
              secondStreet: secondStreet,
              references: references,
              zipCode: zipCode,
              latitude: latitude,
              longitude: longitude,
              addressType: addressType,
              isFavourite: isFavourite,
              cityID: cityID,
              personID: personID
            }, {
              fields: ['addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'isFavourite', 'cityID', 'personID'],
              returning: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'registeredDate', 'isActive', 'isFavourite', 'cityID', 'personID']
            });

          case 4:
            newAddress = _context.sent;

            if (!newAddress) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Address created successfully',
              address: newAddress
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Address');

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createAddress.apply(this, arguments);
}

function getAddresses(_x3, _x4) {
  return _getAddresses.apply(this, arguments);
} // Get information of an address


function _getAddresses() {
  _getAddresses = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, addresses;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Address["default"].findAndCountAll({
              attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'registeredDate', 'unregisteredDate', 'isActive', 'isFavourite', 'cityID', 'personID'],
              where: {
                isActive: true
              },
              include: [{
                model: _City["default"],
                Person: _Person["default"],
                attributes: ['cityName']
              }, {
                model: _Person["default"],
                attributes: ['names', 'lastNames']
              }],
              limit: limit,
              offset: from
            });

          case 5:
            addresses = _context2.sent;

            if (!(addresses.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              addresses: addresses
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Any Address');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get Addresses');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getAddresses.apply(this, arguments);
}

function getAddress(_x5, _x6) {
  return _getAddress.apply(this, arguments);
} //Get all the informationf of an address of a person


function _getAddress() {
  _getAddress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var addressID, address;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            addressID = req.params.addressID;
            _context3.prev = 1;
            _context3.next = 4;
            return _Address["default"].findOne({
              attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'isActive', 'registeredDate', 'unregisteredDate', 'isFavourite', 'cityID', 'personID'],
              where: {
                addressID: addressID
              },
              include: [{
                model: _City["default"],
                attributes: ['cityName']
              }, {
                model: _Person["default"],
                attributes: ['completeName']
              }]
            });

          case 4:
            address = _context3.sent;

            if (!address) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              address: address
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Address ID');

          case 10:
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            console.log('Error', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Address');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return _getAddress.apply(this, arguments);
}

function getAddressPerson(_x7, _x8) {
  return _getAddressPerson.apply(this, arguments);
} // Update the information of an address


function _getAddressPerson() {
  _getAddressPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var personID, limit, from, addresses;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            personID = req.params.personID;
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context4.prev = 3;
            _context4.next = 6;
            return _Address["default"].findAndCountAll({
              attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'isFavourite', 'cityID'],
              where: {
                isActive: true,
                personID: personID
              },
              order: [['isFavourite', 'DESC']],
              include: [{
                model: _Person["default"],
                attributes: ['personID', 'completeName']
              }, {
                model: _City["default"],
                attributes: ['cityID', 'cityName']
              }],
              limit: limit,
              offset: from
            });

          case 6:
            addresses = _context4.sent;

            if (!addresses) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              addresses: addresses
            }));

          case 11:
            (0, _errors.returnNotFound)(res, 'Address ID');

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Address of Person');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return _getAddressPerson.apply(this, arguments);
}

function updateAddress(_x9, _x10) {
  return _updateAddress.apply(this, arguments);
} // Change activation status


function _updateAddress() {
  _updateAddress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var addressID, _req$body2, addressName, mainStreet, number, secondStreet, references, zipCode, latitude, longitude, addressType, isFavourite, cityID, personID, dbAddress, updatedAddress, favourite;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            addressID = req.params.addressID;
            _req$body2 = req.body, addressName = _req$body2.addressName, mainStreet = _req$body2.mainStreet, number = _req$body2.number, secondStreet = _req$body2.secondStreet, references = _req$body2.references, zipCode = _req$body2.zipCode, latitude = _req$body2.latitude, longitude = _req$body2.longitude, addressType = _req$body2.addressType, isFavourite = _req$body2.isFavourite, cityID = _req$body2.cityID, personID = _req$body2.personID;
            _context5.prev = 2;
            _context5.next = 5;
            return _Address["default"].findOne({
              attributes: ['addressID', 'addressName', 'mainStreet', 'number', 'secondStreet', 'references', 'zipCode', 'latitude', 'longitude', 'addressType', 'isFavourite', 'cityID', 'personID'],
              where: {
                addressID: addressID
              }
            });

          case 5:
            dbAddress = _context5.sent;

            if (!(dbAddress === null || dbAddress === undefined)) {
              _context5.next = 10;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Address ID');
            _context5.next = 23;
            break;

          case 10:
            _context5.next = 12;
            return _Address["default"].update({
              addressName: addressName,
              mainStreet: mainStreet,
              number: number,
              secondStreet: secondStreet,
              references: references,
              zipCode: zipCode,
              latitude: latitude,
              longitude: longitude,
              addressType: addressType,
              isFavourite: isFavourite,
              cityID: cityID,
              personID: personID
            }, {
              where: {
                addressID: addressID
              }
            });

          case 12:
            updatedAddress = _context5.sent;

            if (!isFavourite) {
              _context5.next = 18;
              break;
            }

            _context5.next = 16;
            return _database.sequelize.query("\n                    update \"address\"\n                        set \"isFavourite\" = false\n                        where \"personID\" = ".concat(dbAddress.personID, "\n                            and \"addressID\" != ").concat(addressID, ";\n                "));

          case 16:
            favourite = _context5.sent;
            console.log(favourite);

          case 18:
            if (!updateAddress) {
              _context5.next = 22;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Address updated successfully'
            }));

          case 22:
            (0, _errors.returnNotFound)(res, 'Address ID');

          case 23:
            _context5.next = 29;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Update Address');

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 25]]);
  }));
  return _updateAddress.apply(this, arguments);
}

function changeActivationAddress(_x11, _x12) {
  return _changeActivationAddress.apply(this, arguments);
} // Delete an address


function _changeActivationAddress() {
  _changeActivationAddress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var addressID, type, value, action, afirmation, negation, changeActivationJSON, dbAddress, changeActivation;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            addressID = req.params.addressID;
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
                returnWrongError(res, 'type', 'request');
              }
            }

            _context6.prev = 6;
            _context6.next = 9;
            return _Address["default"].findOne({
              attributes: ['addressID', 'addressName', 'isActive', 'registeredDate', 'unregisteredDate'],
              where: {
                addressID: addressID
              }
            });

          case 9:
            dbAddress = _context6.sent;

            if (!dbAddress) {
              _context6.next = 21;
              break;
            }

            _context6.next = 13;
            return _Address["default"].update(changeActivationJSON, {
              where: {
                addressID: addressID,
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
              message: 'Address ' + type.toLowerCase() + 'd successfully'
            }));

          case 18:
            return _context6.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while ' + action + ' an Address or Address already ' + afirmation,
              error: 'Error 0'
            }));

          case 19:
            _context6.next = 22;
            break;

          case 21:
            (0, _errors.returnNotFound)(res, 'Address ID');

          case 22:
            _context6.next = 28;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](6);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Change Activation Address');

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 24]]);
  }));
  return _changeActivationAddress.apply(this, arguments);
}

function deleteAddress(_x13, _x14) {
  return _deleteAddress.apply(this, arguments);
}

function _deleteAddress() {
  _deleteAddress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var addressID, countDeleted;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            addressID = req.params.addressID;
            _context7.prev = 1;
            _context7.next = 4;
            return _Address["default"].destroy({
              where: {
                addressID: addressID
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
              message: 'Address deleted successfuylly'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Address ID');

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, 'Delete Address');

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));
  return _deleteAddress.apply(this, arguments);
}