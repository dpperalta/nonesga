"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Role = _database.sequelize.define('role', {
  roleID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  roleCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  roleName: {
    type: _sequelize["default"].STRING(100),
    allowNull: false,
    unique: true
  },
  privileges: {
    type: _sequelize["default"].SMALLINT
  },
  description: {
    type: _sequelize["default"].TEXT
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Role;
exports["default"] = _default;