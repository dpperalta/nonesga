"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Course = _interopRequireDefault(require("./Course"));

var _Teacher = _interopRequireDefault(require("./Teacher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Subject = _database.sequelize.define('subject', {
  subjectID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  subjectCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  subjectName: {
    type: _sequelize["default"].STRING(250),
    allowNull: false
  },
  description: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  details: {
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
  },
  gradeNeeded: {
    type: _sequelize["default"].SMALLINT
  },
  gradeHomologation: {
    type: _sequelize["default"].STRING(2)
  },
  gradeMinimun: {
    type: _sequelize["default"].SMALLINT
  },
  gradeMaximun: {
    type: _sequelize["default"].SMALLINT
  },
  teacherID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'teacher',
      key: 'teacherID'
    }
  },
  courseID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'course',
      key: 'courseID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Course["default"].hasMany(Subject, {
  foreignKey: {
    name: 'courseID',
    targetKey: 'courseID'
  }
});

Subject.belongsTo(_Course["default"], {
  foreignKey: {
    name: 'courseID',
    targetKey: 'courseID'
  }
});

_Teacher["default"].hasMany(Subject, {
  foreignKey: {
    name: 'teacherID',
    targetKey: 'teacherID'
  }
});

Subject.belongsTo(_Teacher["default"], {
  foreignKey: {
    name: 'teacherID',
    targetKey: 'teacherID'
  }
});
var _default = Subject;
exports["default"] = _default;