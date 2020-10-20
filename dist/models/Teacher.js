"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Person = _interopRequireDefault(require("./Person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Teacher = _database.sequelize.define('teacher', {
  teacherID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  teacherCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  status: {
    type: _sequelize["default"].SMALLINT
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
  details: {
    type: _sequelize["default"].TEXT
  },
  bio: {
    type: _sequelize["default"].TEXT
  },
  ratting: {
    type: _sequelize["default"].SMALLINT
  },
  personID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'person',
      key: 'personID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Person["default"].hasMany(Teacher, {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});

Teacher.belongsTo(_Person["default"], {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});
var _default = Teacher;
exports["default"] = _default;