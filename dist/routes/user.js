"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var router = (0, _express.Router)();

var mAuth = require('../middlewares/authentication'); // Routes without params


router.post('/', mAuth.tokenValidation, _user.createDefaultUser);
router.get('/', mAuth.tokenValidation, _user.getUsers);
router.post('/create', [mAuth.tokenValidation, mAuth.adminValidation], _user.createUser); // Routes with params

router.get('/:userID', mAuth.tokenValidation, _user.getUser);
router.put('/:userID', mAuth.tokenValidation, _user.updateUser);
router["delete"]('/:userID', [mAuth.tokenValidation, mAuth.adminValidation], _user.deleteUser);
router.post('/:userID?', [mAuth.tokenValidation, mAuth.adminValidation], _user.changeActivationUser);
router.get('/college/:collegeID', _user.getCollegeUser);
var _default = router;
exports["default"] = _default;