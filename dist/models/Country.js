"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Country = _database.sequelize.define('country', {
  countryID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  countryCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  countryName: {
    type: _sequelize["default"].STRING(250),
    allowNull: false,
    unique: true
  },
  countryDetails: {
    type: _sequelize["default"].TEXT
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  callCode: {
    type: _sequelize["default"].STRING(5),
    allowNull: false
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  currency: {
    type: _sequelize["default"].STRING(100)
  },
  currencySymbol: {
    type: _sequelize["default"].STRING(3)
  },
  longLanguage: {
    type: _sequelize["default"].STRING(100)
  },
  shortLanguage: {
    type: _sequelize["default"].STRING(5)
  },
  status: {
    type: _sequelize["default"].SMALLINT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Country;
exports["default"] = _default;