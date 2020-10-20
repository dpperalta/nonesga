"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _academicPeriod = require("../controllers/academicPeriod.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _academicPeriod.createAcademicPeriod);
router.get('/', _authentication["default"].tokenValidation, _academicPeriod.getAcademicPeriods); // Routes with params

router.get('/:periodID', _authentication["default"].tokenValidation, _academicPeriod.getAcademicPeriod);
router.post('/:periodID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _academicPeriod.changeActivationAcademicPeriod);
router.put('/:periodID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _academicPeriod.updateAcademicPeriod);
router["delete"]('/:periodID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _academicPeriod.deleteAcademicPeriod);
var _default = router;
/*import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {createCity,
        getCity,
        getCities,
        updateCity,
        changeActivationCity,
        deleteCity,
        getCitiesProvince } from '../controllers/city.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCity);
router.get('/', mAuth.tokenValidation, getCities);

// Routes with params
router.get('/:cityID', mAuth.tokenValidation, getCity);
router.put('/:cityID', [ mAuth.tokenValidation, mAuth.adminValidation ], updateCity);
router.post('/:cityID', [ mAuth.tokenValidation, mAuth.adminValidation ], changeActivationCity);
router.delete('/:cityID', [ mAuth.tokenValidation, mAuth.superAdminValidation ], deleteCity);
router.get('/province/:provinceID', mAuth.tokenValidation, getCitiesProvince);

export default router;*/

exports["default"] = _default;