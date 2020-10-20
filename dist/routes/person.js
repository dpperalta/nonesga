"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _person = require("../controllers/person.controller");

var mAuth = require('../middlewares/authentication');

var router = (0, _express.Router)(); // Routes without params

router.post('/', mAuth.tokenValidation, _person.createPerson);
router.get('/', mAuth.tokenValidation, _person.getPeople);
router.get('/active', mAuth.tokenValidation, _person.getActivePeople);
router.get('/inactive', mAuth.tokenValidation, _person.getInactivePeople);
router.get('/activeType', mAuth.tokenValidation, _person.getActivePeopleType); //Routes with params

router.put('/:personID', mAuth.tokenValidation, _person.updatePerson);
router.put('/inactivate/:personID', mAuth.tokenValidation, _person.inactivatePerson);
router.put('/activate/:personID', mAuth.tokenValidation, _person.activatePerson);
router.get('/:personID', mAuth.tokenValidation, _person.getPerson);
router["delete"]('/:personID', [mAuth.tokenValidation, mAuth.adminValidation], _person.deletePerson);
router.get('/people/find', mAuth.tokenValidation, _person.findPerson);
var _default = router;
exports["default"] = _default;