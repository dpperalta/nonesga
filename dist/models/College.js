"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var College = _database.sequelize.define('college', {
  collegeID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  collegeName: {
    type: _sequelize["default"].STRING(500),
    allowNull: false
  },
  collegeShowName: {
    type: _sequelize["default"].TEXT
  },
  collegeCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  detail: {
    type: _sequelize["default"].TEXT
  },
  flag: {
    type: _sequelize["default"].STRING(500)
  },
  mainColour: {
    type: _sequelize["default"].STRING(20)
  },
  secondaryColour: {
    type: _sequelize["default"].STRING(20)
  },
  status: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  image: {
    type: _sequelize["default"].STRING(500)
  },
  logo: {
    type: _sequelize["default"].STRING(500)
  },
  description: {
    type: _sequelize["default"].TEXT
  },
  registratedDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregistratedDate: {
    type: _sequelize["default"].DATE
  },
  lastChangeDate: {
    type: _sequelize["default"].DATE
  },
  changeDetail: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  lastChangeUser: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = College;
exports["default"] = _default;