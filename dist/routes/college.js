"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _college = require("../controllers/college.controller");

var router = (0, _express.Router)();

var mAuth = require('../middlewares/authentication'); // Routes without params


router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], _college.createCollege);
router.get('/', mAuth.tokenValidation, _college.getColleges); // Routes with params

router.post('/:collegeID', [mAuth.tokenValidation, mAuth.adminValidation], _college.changeActivationCollege);
router.get('/type/:type', mAuth.tokenValidation, _college.getStatusColleges);
router.get('/:collegeID', mAuth.tokenValidation, _college.getCollege);
router.put('/:collegeID', [mAuth.tokenValidation, mAuth.adminValidation], _college.updateCollege);
router["delete"]('/:collegeID', [mAuth.tokenValidation, mAuth.superAdminValidation], _college.deleteCollete);
var _default = router;
exports["default"] = _default;