"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _role = require("../controllers/role.controller");

var mAuth = require('../middlewares/authentication');

var router = (0, _express.Router)(); //Crete routes

router.post('/', [mAuth.tokenValidation, mAuth.superAdminValidation], _role.createRole);
router.get('/', mAuth.tokenValidation, _role.getRoles);
router.get('/number', [mAuth.tokenValidation, mAuth.superAdminValidation], _role.getActiveRolesWithCounter);
router.get('/active', mAuth.tokenValidation, _role.getActiveRolesWitoutCounter); // Routes with params

router.put('/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], _role.updateRole);
router.put('/inactivate/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], _role.inactivateRole);
router.put('/activate/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], _role.activateRole);
router["delete"]('/:roleID', [mAuth.tokenValidation, mAuth.superAdminValidation], _role.deleteRole);
var _default = router;
exports["default"] = _default;