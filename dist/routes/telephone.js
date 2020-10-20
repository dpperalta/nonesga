"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _telephone = require("../controllers/telephone.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
// Routes without params
router.post('/', _authentication["default"].tokenValidation, _telephone.createTelephone);
router.get('/', _authentication["default"].tokenValidation, _telephone.getTelephones); // Routes with params

router.get('/:telephoneID', _authentication["default"].tokenValidation, _telephone.getTelephone);
router.put('/:telephoneID', _authentication["default"].tokenValidation, _telephone.updateTelephone);
router["delete"]('/:telephoneID', [_authentication["default"].tokenValidation, _authentication["default"].superAdminValidation], _telephone.deleteTelephone);
router.post('/:telephoneID', _authentication["default"].tokenValidation, _telephone.changeActivationTelephone);
router.get('/person/:personID', _authentication["default"].tokenValidation, _telephone.getPersonTelephones);
var _default = router;
/*
    Test only for dnone branch
*/

exports["default"] = _default;