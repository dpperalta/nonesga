"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _personType = require("../controllers/personType.controller");

var router = (0, _express.Router)();

var mAuth = require('../middlewares/authentication'); // Routes without params 


router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], _personType.createPersonType);
router.get('/', mAuth.tokenValidation, _personType.getPersonTypes);
router.get('/active', mAuth.tokenValidation, _personType.getActivePersonTypes); // Routes with params

router.put('/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], _personType.updatePersonType);
router.put('/inactivate/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], _personType.inactivatePersonType);
router.put('/activate/:personTypeID', [mAuth.tokenValidation, mAuth.adminValidation], _personType.activatePersonType);
router["delete"]('/:personTypeID', [mAuth.tokenValidation, mAuth.superAdminValidation], _personType.deletePersonType);
var _default = router;
exports["default"] = _default;