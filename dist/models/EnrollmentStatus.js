"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EnrollmentStatus = _database.sequelize.define('enrollmentStatus', {
  statusID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  code: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false
  },
  description: {
    type: _sequelize["default"].STRING(150),
    allowNull: false
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  detail: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = EnrollmentStatus;
exports["default"] = _default;