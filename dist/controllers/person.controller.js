"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPerson = createPerson;
exports.getPeople = getPeople;
exports.getActivePeople = getActivePeople;
exports.getPerson = getPerson;
exports.getInactivePeople = getInactivePeople;
exports.getActivePeopleType = getActivePeopleType;
exports.updatePerson = updatePerson;
exports.inactivatePerson = inactivatePerson;
exports.activatePerson = activatePerson;
exports.deletePerson = deletePerson;
exports.findPerson = findPerson;

var _Person = _interopRequireDefault(require("../models/Person"));

var _PersonType = _interopRequireDefault(require("../models/PersonType"));

var _database = require("../database/database");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create a person
function createPerson(_x, _x2) {
  return _createPerson.apply(this, arguments);
} // Get all people


function _createPerson() {
  _createPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, dni, birthdate, names, lastNames, details, bio, image, sex, personTypeID, sexToCreate, sexToRead, newPerson;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, dni = _req$body.dni, birthdate = _req$body.birthdate, names = _req$body.names, lastNames = _req$body.lastNames, details = _req$body.details, bio = _req$body.bio, image = _req$body.image, sex = _req$body.sex, personTypeID = _req$body.personTypeID;
            sexToCreate = '';
            sexToRead = sex.toLowerCase();

            if (sexToRead === 'masculino' || sexToRead === 'hombre' || sexToRead === 'hombres' || sexToRead === 'varon' || sexToRead === 'varones') {
              sexToCreate = 'Male';
            } else {
              if (sexToRead = 'femenino' || sexToRead === 'femeninas' || sexToRead === 'mujer' || sexToRead === 'mujeres' || sexToRead === 'dama' || sexToRead === 'damas') {
                sexToCreate = 'Female';
              } else {
                sexToCreate = 'Unknown';
              }
            }

            _context.prev = 4;
            _context.next = 7;
            return _Person["default"].create({
              dni: dni,
              birthdate: birthdate,
              names: names,
              lastNames: lastNames,
              completeName: names + ' ' + lastNames,
              details: details,
              bio: bio,
              image: image,
              sex: sexToCreate,
              personTypeID: personTypeID
            }, {
              fields: ['dni', 'birthdate', 'names', 'lastNames', 'completeName', 'image', 'details', 'bio', 'sex', 'personTypeID'],
              returning: ['personID', 'dni', 'birthdate', 'names', 'lastNames', 'completeName', 'image', 'details', 'bio', 'isActive', 'registeredDate', 'unregisteredDate', 'votes', 'sex', 'personTypeID']
            });

          case 7:
            newPerson = _context.sent;

            if (!newPerson) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person created successfully',
              newPerson: newPerson
            }));

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            console.log('Error:', _context.t0);
            (0, _errors.returnError)(res, _context.t0, 'Create Person');

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12]]);
  }));
  return _createPerson.apply(this, arguments);
}

function getPeople(_x3, _x4) {
  return _getPeople.apply(this, arguments);
} // Get only active people


function _getPeople() {
  _getPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var limit, from, people;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context2.prev = 2;
            _context2.next = 5;
            return _Person["default"].findAndCountAll({
              attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
              limit: limit,
              offset: from
            });

          case 5:
            people = _context2.sent;

            if (!(people.count > 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              ok: true,
              people: people
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'All People');

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.log('Error:', _context2.t0);
            (0, _errors.returnError)(res, _context2.t0, 'Get People');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _getPeople.apply(this, arguments);
}

function getActivePeople(_x5, _x6) {
  return _getActivePeople.apply(this, arguments);
} // Get information of a person by ID


function _getActivePeople() {
  _getActivePeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var limit, from, people;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context3.prev = 2;
            _context3.next = 5;
            return _Person["default"].findAndCountAll({
              attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
              where: {
                isActive: true
              },
              limit: limit,
              offset: from
            });

          case 5:
            people = _context3.sent;

            if (!(people.count > 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(200).json({
              ok: true,
              people: people
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Active People');

          case 11:
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](2);
            console.log('Error:', _context3.t0);
            (0, _errors.returnError)(res, _context3.t0, 'Get Active People');

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 13]]);
  }));
  return _getActivePeople.apply(this, arguments);
}

function getPerson(_x7, _x8) {
  return _getPerson.apply(this, arguments);
} // Get all inactive people


function _getPerson() {
  _getPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var personID, person;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            personID = req.params.personID;
            _context4.prev = 1;
            _context4.next = 4;
            return _database.sequelize.query("\n        SELECT \tpe.\"personID\" id, \n                pe.\"dni\" cedula, \n                pe.\"birthdate\" fechaNacimiento, \n                pe.\"names\" nombres, \n                pe.\"lastNames\" apellidos,\n                pe.\"completeName\" nombreCompleto,\n                pe.\"image\" foto,\n                pe.\"details\" detalles,\n                pe.\"registeredDate\" fechaAlta,\n                pe.\"unregisteredDate\" fechaBaja,\n                pe.\"isActive\" activo,\n                pe.\"bio\" biografia,\n                pe.\"votes\" votos,\n                pe.\"sex\" sexo,\n                pt.\"personTypeID\" idTipoPersona,\n                pt.\"typeName\" tipoPersona\n        FROM \"person\" pe, \"personType\" pt\n        WHERE pe.\"personTypeID\" = pt.\"personTypeID\"\n            AND pe.\"personID\" = ".concat(personID));

          case 4:
            person = _context4.sent;

            if (!person) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              ok: true,
              person: person[0],
              counter: person[1].rowCount
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Person ID');

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log('Error:', _context4.t0);
            (0, _errors.returnError)(res, _context4.t0, 'Get Person');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return _getPerson.apply(this, arguments);
}

function getInactivePeople(_x9, _x10) {
  return _getInactivePeople.apply(this, arguments);
} // Get all active people with people type description


function _getInactivePeople() {
  _getInactivePeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var limit, from, people;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            _context5.prev = 2;
            _context5.next = 5;
            return _Person["default"].findAndCountAll({
              attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'sex', 'unregisteredDate', 'personTypeID'],
              where: {
                isActive: false
              },
              limit: limit,
              offset: from
            });

          case 5:
            people = _context5.sent;

            if (!(people.count > 0)) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(200).json({
              ok: true,
              people: people
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Inacctive People');

          case 11:
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](2);
            console.log('Error:', _context5.t0);
            (0, _errors.returnError)(res, _context5.t0, 'Get Inactive People');

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 13]]);
  }));
  return _getInactivePeople.apply(this, arguments);
}

function getActivePeopleType(_x11, _x12) {
  return _getActivePeopleType.apply(this, arguments);
} // Update a Person providing personID


function _getActivePeopleType() {
  _getActivePeopleType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var limit, from, people;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            limit = req.query.limit || 25;
            from = req.query.from || 0;
            /*try {
                const people = await Person.findAndCountAll({
                    attributes: ['personID', 'names', 'lastNames', 'completeName', 'birthdate', 'isActive', 'registeredDate', 'image', 'details', 'bio', 'votes', 'unregisteredDate', 'personTypeID'],
                    where: {
                        isActive: true
                    },
                    include: [{
                        model: PersonType,
                        attributes: ['personTypeID', 'typeName', 'personType']
                    }]
                });
                if (people.count > 0) {
                    return res.status(200).json({
                        ok: true,
                        people
                    });
                } else {
                    returnNotFound(res, 'Active People');
                }
            }*/

            _context6.prev = 2;
            _context6.next = 5;
            return _database.sequelize.query("\n                SELECT \"person\".\"completeName\",  \"person\".\"isActive\", \"person\".\"birthdate\", \"person\".\"bio\", \"person\".\"sex\", \"personType\".\"typeName\"\n                FROM \"person\", \"personType\" \n                WHERE \"person\".\"personTypeID\" = \"personType\".\"personTypeID\"\n                    AND \"person\".\"isActive\" = true\n                    limit: ".concat(limit, "\n                    offset: ").concat(from, ";"));

          case 5:
            people = _context6.sent;

            if (!people) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", res.status(200).json({
              ok: true,
              people: people[0],
              counter: people[1].rowCount
            }));

          case 10:
            (0, _errors.returnNotFound)(res, 'Active with Type');

          case 11:
            _context6.next = 17;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](2);
            console.log('Error:', _context6.t0);
            (0, _errors.returnError)(res, _context6.t0, 'Get Active People');

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 13]]);
  }));
  return _getActivePeopleType.apply(this, arguments);
}

function updatePerson(_x13, _x14) {
  return _updatePerson.apply(this, arguments);
} // Inactivate a person


function _updatePerson() {
  _updatePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var personID, _req$body2, dni, names, lastNames, birthdate, image, details, bio, sex, personTypeID, sexToCreate, sexToRead, dbPerson, updatedPerson;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            personID = req.params.personID;
            _req$body2 = req.body, dni = _req$body2.dni, names = _req$body2.names, lastNames = _req$body2.lastNames, birthdate = _req$body2.birthdate, image = _req$body2.image, details = _req$body2.details, bio = _req$body2.bio, sex = _req$body2.sex, personTypeID = _req$body2.personTypeID;
            sexToCreate = '';
            sexToRead = sex.toLowerCase();

            if (sexToRead === 'masculino' || sexToRead === 'hombre' || sexToRead === 'hombres' || sexToRead === 'varon' || sexToRead === 'varones') {
              sexToCreate = 'Male';
            } else {
              if (sexToRead = 'femenino' || sexToRead === 'femeninas' || sexToRead === 'mujer' || sexToRead === 'mujeres' || sexToRead === 'dama' || sexToRead === 'damas') {
                sexToCreate = 'Female';
              } else {
                sexToCreate = 'Unknown';
              }
            }

            _context7.prev = 5;
            _context7.next = 8;
            return _Person["default"].findOne({
              attributes: ['dni', 'names', 'lastNames', 'completeName', 'image', 'birthdate', 'details', 'bio', 'sex', 'personTypeID'],
              where: {
                personID: personID
              }
            });

          case 8:
            dbPerson = _context7.sent;

            if (!(dbPerson === null || dbPerson === undefined)) {
              _context7.next = 13;
              break;
            }

            (0, _errors.returnNotFound)(res, 'Person ID');
            _context7.next = 21;
            break;

          case 13:
            _context7.next = 15;
            return _Person["default"].update({
              dni: dni,
              names: names,
              lastNames: lastNames,
              completeName: names + '  ' + lastNames,
              birthdate: birthdate,
              details: details,
              bio: bio,
              sex: sexToCreate,
              image: image,
              personTypeID: personTypeID
            }, {
              where: {
                personID: personID
              }
            });

          case 15:
            updatedPerson = _context7.sent;

            if (!updatedPerson) {
              _context7.next = 20;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person updated successfully',
              count: updatedPerson
            }));

          case 20:
            (0, _errors.returnNotFound)(res, 'Person ID');

          case 21:
            _context7.next = 27;
            break;

          case 23:
            _context7.prev = 23;
            _context7.t0 = _context7["catch"](5);
            console.log('Error:', _context7.t0);
            (0, _errors.returnError)(res, _context7.t0, "Update Person");

          case 27:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[5, 23]]);
  }));
  return _updatePerson.apply(this, arguments);
}

function inactivatePerson(_x15, _x16) {
  return _inactivatePerson.apply(this, arguments);
} // Inactivate a person


function _inactivatePerson() {
  _inactivatePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var personID, isActive, dbPerson, _inactivatePerson2;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            personID = req.params.personID;
            isActive = false;
            _context8.prev = 2;
            _context8.next = 5;
            return _Person["default"].findOne({
              attributes: ['dni', 'completeName', 'birthdate', 'isActive', 'image', 'bio', 'sex', 'details'],
              where: {
                personID: personID
              }
            });

          case 5:
            dbPerson = _context8.sent;

            if (!dbPerson) {
              _context8.next = 17;
              break;
            }

            _context8.next = 9;
            return _Person["default"].update({
              isActive: isActive,
              unregisteredDate: _database.sequelize.fn('NOW')
            }, {
              where: {
                personID: personID,
                isActive: true
              }
            });

          case 9:
            _inactivatePerson2 = _context8.sent;

            if (!(_inactivatePerson2 > 0)) {
              _context8.next = 14;
              break;
            }

            return _context8.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person inactivated successfully'
            }));

          case 14:
            return _context8.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while inactivating a Person or Person already inactive',
              error: 'Error 0'
            }));

          case 15:
            _context8.next = 18;
            break;

          case 17:
            (0, _errors.returnNotFound)(res, 'Active Person');

          case 18:
            _context8.next = 24;
            break;

          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](2);
            console.log('Error:', _context8.t0);
            (0, _errors.returnError)(res, _context8.t0, 'Inactivate Person');

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 20]]);
  }));
  return _inactivatePerson.apply(this, arguments);
}

function activatePerson(_x17, _x18) {
  return _activatePerson.apply(this, arguments);
} // Delete a Person


function _activatePerson() {
  _activatePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var personID, isActive, dbPerson, _inactivatePerson3;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            personID = req.params.personID;
            isActive = true;
            _context9.prev = 2;
            _context9.next = 5;
            return _Person["default"].findOne({
              attributes: ['dni', 'completeName', 'birthdate', 'isActive', 'image', 'bio', 'details'],
              where: {
                personID: personID
              }
            });

          case 5:
            dbPerson = _context9.sent;

            if (!dbPerson) {
              _context9.next = 17;
              break;
            }

            _context9.next = 9;
            return _Person["default"].update({
              isActive: isActive
            }, {
              where: {
                personID: personID,
                isActive: false
              }
            });

          case 9:
            _inactivatePerson3 = _context9.sent;

            if (!(_inactivatePerson3 > 0)) {
              _context9.next = 14;
              break;
            }

            return _context9.abrupt("return", res.status(200).json({
              ok: true,
              message: 'Person activated successfully'
            }));

          case 14:
            return _context9.abrupt("return", res.status(400).json({
              ok: false,
              message: 'Error while activating a Person or Person already active',
              error: 'Error 0'
            }));

          case 15:
            _context9.next = 18;
            break;

          case 17:
            (0, _errors.returnNotFound)(res, 'Inactive Person');

          case 18:
            _context9.next = 24;
            break;

          case 20:
            _context9.prev = 20;
            _context9.t0 = _context9["catch"](2);
            console.log('Error:', _context9.t0);
            (0, _errors.returnError)(res, _context9.t0, 'Activate Person');

          case 24:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 20]]);
  }));
  return _activatePerson.apply(this, arguments);
}

function deletePerson(_x19, _x20) {
  return _deletePerson.apply(this, arguments);
} // Find a Person by DNI or Names


function _deletePerson() {
  _deletePerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var personID, countDeleted;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            personID = req.params.personID;
            _context10.prev = 1;
            _context10.next = 4;
            return _Person["default"].destroy({
              where: {
                personID: personID
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
              message: 'Person deleted successfully'
            }));

          case 9:
            (0, _errors.returnNotFound)(res, 'Person ID');

          case 10:
            _context10.next = 16;
            break;

          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](1);
            console.log('Error:', _context10.t0);
            (0, _errors.returnError)(res, _context10.t0, 'Delete Person');

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 12]]);
  }));
  return _deletePerson.apply(this, arguments);
}

function findPerson(_x21, _x22) {
  return _findPerson.apply(this, arguments);
}

function _findPerson() {
  _findPerson = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var dni, names, people;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            dni = req.query.dni;
            names = req.query.names;

            if (!(dni.length === 0 && names.length === 0)) {
              _context11.next = 4;
              break;
            }

            return _context11.abrupt("return", res.status(400).json({
              ok: false,
              message: 'You must provide at least one searching parameter'
            }));

          case 4:
            if (!(dni.length > 0 && dni.length > 10)) {
              _context11.next = 6;
              break;
            }

            return _context11.abrupt("return", res.status(400).json({
              ok: false,
              message: 'DNI information is incorrect'
            }));

          case 6:
            if (names.length === 0 || dni.length === 10) {
              names = 'NN';
            }

            _context11.prev = 7;
            _context11.next = 10;
            return _database.sequelize.query("\n            SELECT\t\"person\".\"personID\" idPersona,\n                    \"person\".\"dni\" cedula,\n                    \"person\".\"birthdate\" nacimiento,\n                    \"person\".\"names\" nombres,\n                    \"person\".\"lastNames\" apellidos,\n                    \"person\".\"completeName\" nombreCompleto,\n                    \"person\".\"image\" foto,\n                    \"person\".\"details\" detalles,\n                    \"person\".\"registeredDate\" fechaRegistro,\n                    \"person\".\"isActive\" activo,\n                    \"person\".\"bio\" biografia,\n                    \"person\".\"votes\" votos,\n                    \"person\".\"personTypeID\" tipoPersonaID,\n                    \"person\".\"sex\" sexo,\n                    \"personType\".\"typeName\" tipoPersona\n            FROM \"person\", \"personType\"\n            WHERE \"person\".\"personTypeID\" = \"personType\".\"personTypeID\"\n                AND (\"person\".\"dni\" = '".concat(dni, "'\n                OR upper(\"person\".\"completeName\") like upper('%").concat(names, "%'))\n                AND \"person\".\"isActive\" = true\n                ORDER BY apellidos, nombres;\n        "));

          case 10:
            people = _context11.sent;

            if (!people) {
              _context11.next = 15;
              break;
            }

            return _context11.abrupt("return", res.status(200).json({
              ok: true,
              people: people[0],
              total: people[1].rowCount
            }));

          case 15:
            (0, _errors.returnNotFound)(res, 'People with provided DNI or Names');

          case 16:
            _context11.next = 22;
            break;

          case 18:
            _context11.prev = 18;
            _context11.t0 = _context11["catch"](7);
            console.log('Error:', _context11.t0);
            (0, _errors.returnError)(res, _context11.t0, 'Find Person by DNI or Names');

          case 22:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[7, 18]]);
  }));
  return _findPerson.apply(this, arguments);
}