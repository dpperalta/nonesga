"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PhoneOperator = _database.sequelize.define('phoneOperator', {
  operatorID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  operatorName: {
    type: _sequelize["default"].STRING(50),
    allowNull: false,
    unique: true
  },
  detail: {
    type: _sequelize["default"].TEXT
  },
  smsNumber: {
    type: _sequelize["default"].STRING(15)
  },
  cost: {
    type: _sequelize["default"].DOUBLE
  },
  observations: {
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

var _default = PhoneOperator;
exports["default"] = _default;