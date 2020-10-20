"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Session = _database.sequelize.define('session', {
  sessionID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  sessionRoom: {
    type: _sequelize["default"].INTEGER
  },
  sessionDate: {
    type: _sequelize["default"].DATE,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  sessionToken: {
    type: _sequelize["default"].TEXT
  },
  sessionExpiration: {
    type: _sequelize["default"].STRING(50)
  },
  sessionIP: {
    type: _sequelize["default"].STRING(20)
  },
  sessionDevice: {
    type: _sequelize["default"].STRING(20)
  },
  sessionCode: {
    type: _sequelize["default"].STRING(50)
  },
  userID: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Session.hasMany(_User["default"], {
  foreignKey: 'userID',
  sourceKey: 'userID'
});

_User["default"].belongsTo(Session, {
  foreignKey: 'userID',
  sourceKey: 'userID'
});

var _default = Session;
exports["default"] = _default;