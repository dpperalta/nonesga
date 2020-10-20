"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _canton = require("../controllers/canton.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _canton.createCanton);
router.get('/', _authentication["default"].tokenValidation, _canton.getCantons); // Routes with params

router.get('/:cantonID', _authentication["default"].tokenValidation, _canton.getCanton);
router.get('/province/:provinceID', _authentication["default"].tokenValidation, _canton.getCantonsProvince);
router.put('/:cantonID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _canton.updateCanton);
router.post('/:cantonID', [_authentication["default"].tokenValidation, _authentication["default"].adminValidation], _canton.changeActivationCanton);
router["delete"]('/:cantonID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _canton.deleteCanton);
var _default = router;
/*
import { Router } from 'express';

import mAuth from '../middlewares/authentication';

const router = Router();

import {createCanton,
        getCanton,
        getCantons,
        updateCanton,
        changeActivationCanton,
        deleteCanton,
        getCantonsProvince } from '../controllers/canton.controller';

// Routes without params
router.post('/', [mAuth.tokenValidation, mAuth.adminValidation], createCanton);
router.get('/', mAuth.tokenValidation, getCantons);

// Routes with params
router.get('/:cantonID', mAuth.tokenValidation, getCanton);
router.put('/:cantonID', [ mAuth.tokenValidation, mAuth.adminValidation ], updateCanton);
router.post('/:cantonID', [ mAuth.tokenValidation, mAuth.adminValidation ], changeActivationCanton);
router.delete('/:cantonID', [ mAuth.tokenValidation, mAuth.superAdminValidation ], deleteCanton);


export default router;
*/

exports["default"] = _default;