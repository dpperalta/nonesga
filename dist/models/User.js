"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Role = _interopRequireDefault(require("./Role"));

var _Person = _interopRequireDefault(require("./Person"));

var _College = _interopRequireDefault(require("./College"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _database.sequelize.define('user', {
  userID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  nick: {
    type: _sequelize["default"].STRING(100),
    unique: true
  },
  pass: {
    type: _sequelize["default"].STRING(400),
    allowNull: false
  },
  email: {
    type: _sequelize["default"].STRING(100),
    allowNull: false,
    unique: true
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  status: {
    type: _sequelize["default"].SMALLINT
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  lastLogin: {
    type: _sequelize["default"].DATE
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  personID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'person',
      key: 'personID'
    }
  },
  roleID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'role',
      key: 'roleID'
    }
  },
  collegeID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'college',
      key: 'collegeID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Role["default"].hasMany(User, {
  foreingKey: 'roleID',
  sourceKey: 'roleID'
});

User.belongsTo(_Role["default"], {
  foreingKey: 'roleID',
  sourceKey: 'roleID'
});

_Person["default"].hasMany(User, {
  foreingKey: 'personID',
  sourceKey: 'personID'
});

User.belongsTo(_Person["default"], {
  foreingKey: 'personID',
  sourceKey: 'personID'
});

_College["default"].hasMany(User, {
  foreingKey: 'collegeID',
  sourceKey: 'collegeID'
});

User.belongsTo(_College["default"], {
  foreingKey: 'collegeID',
  sourceKey: 'collegeID'
});
var _default = User;
exports["default"] = _default;