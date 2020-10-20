"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PersonType = _database.sequelize.define('personType', {
  personTypeID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  personType: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false,
    unique: true
  },
  typeName: {
    type: _sequelize["default"].STRING(50),
    allowNull: false,
    unique: true
  },
  details: {
    type: _sequelize["default"].STRING(500)
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

var _default = PersonType;
exports["default"] = _default;