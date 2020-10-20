"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Calendar = _database.sequelize.define('calendar', {
  calendarID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  date: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  detail: {
    type: _sequelize["default"].TEXT
  },
  year: {
    type: _sequelize["default"].STRING(4)
  },
  updatedDate: {
    type: _sequelize["default"].DATE
  },
  updatedUser: {
    type: _sequelize["default"].INTEGER
  },
  updatedReason: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Calendar;
exports["default"] = _default;