"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Student = _interopRequireDefault(require("./Student"));

var _Exam = _interopRequireDefault(require("./Exam"));

var _Teacher = _interopRequireDefault(require("./Teacher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExamGrade = _database.sequelize.define('examGrade', {
  examGradeID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  grade: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false
  },
  homologatedGrade: {
    type: _sequelize["default"].STRING(5)
  },
  gradeDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  gradeDetail: {
    type: _sequelize["default"].TEXT
  },
  isGraded: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isModified: {
    type: _sequelize["default"].BOOLEAN
  },
  modificationDate: {
    type: _sequelize["default"].DATE
  },
  modificationUser: {
    type: _sequelize["default"].INTEGER
  },
  previousGrade: {
    type: _sequelize["default"].SMALLINT
  },
  studentID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'student',
      key: 'studentID'
    }
  },
  examID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'exam',
      key: 'examID'
    }
  },
  teacherID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'teacher',
      key: 'teacherID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Student["default"].hasMany(ExamGrade, {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

ExamGrade.belongsTo(_Student["default"], {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

_Exam["default"].hasMany(ExamGrade, {
  foreignKey: {
    name: 'examID',
    targetKey: 'examID'
  }
});

ExamGrade.belongsTo(_Exam["default"], {
  foreignKey: {
    name: 'examID',
    targetKey: 'examID'
  }
});

_Teacher["default"].hasMany(ExamGrade, {
  foreignKey: {
    name: 'teacherID',
    targetKey: 'teacherID'
  }
});

ExamGrade.belongsTo(_Teacher["default"], {
  foreignKey: {
    name: 'teacherID',
    targetKey: 'teacherID'
  }
});
var _default = ExamGrade;
exports["default"] = _default;