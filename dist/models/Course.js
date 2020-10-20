"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Course = _database.sequelize.define('course', {
  courseID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  courseCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  courseName: {
    type: _sequelize["default"].STRING(500),
    allowNull: false
  },
  description: {
    type: _sequelize["default"].TEXT
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
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Course;
exports["default"] = _default;