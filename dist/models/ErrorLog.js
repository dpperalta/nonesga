"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ErrorLog = _database.sequelize.define('errorLog', {
  errorLogID: {
    type: _sequelize["default"].INTEGER,
    primarikey: true
  },
  errorDate: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  errorDetail: {
    type: _sequelize["default"].JSON,
    allowNull: false
  },
  errorModule: {
    type: _sequelize["default"].CHAR,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = ErrorLog;
exports["default"] = _default;