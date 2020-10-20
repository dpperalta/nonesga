"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Person = _interopRequireDefault(require("./Person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Student = _database.sequelize.define('student', {
  studentID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  studentCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
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
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  previousCourse: {
    type: _sequelize["default"].INTEGER
  },
  actualCourse: {
    type: _sequelize["default"].INTEGER
  },
  grade: {
    type: _sequelize["default"].SMALLINT
  },
  details: {
    type: _sequelize["default"].TEXT
  },
  ratting: {
    type: _sequelize["default"].SMALLINT
  },
  bio: {
    type: _sequelize["default"].TEXT
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

_Person["default"].hasMany(Student, {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});

Student.belongsTo(_Person["default"], {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});
var _default = Student;
exports["default"] = _default;