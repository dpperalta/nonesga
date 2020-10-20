"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Se podría analizar la posibilidad de anclar el collegeID con el academic period para que cada institución
// pueda crear sus propios periodos académicos
var AcademicPeriod = _database.sequelize.define('academicPeriod', {
  periodID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  startPeriod: {
    type: _sequelize["default"].DATE
  },
  endPeriod: {
    type: _sequelize["default"].DATE
  },
  periodName: {
    type: _sequelize["default"].STRING(150),
    allowNull: false
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
  },
  detail: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = AcademicPeriod;
exports["default"] = _default;