"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _ExamAnswer = _interopRequireDefault(require("./ExamAnswer"));

var _ExamQuestion = _interopRequireDefault(require("./ExamQuestion"));

var _Student = _interopRequireDefault(require("./Student"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StudentAnswer = _database.sequelize.define('studentAnswer', {
  studentAnswerID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  selectedDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  grade: {
    type: _sequelize["default"].DOUBLE
  },
  tryNumber: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  studentAnswer: {
    type: _sequelize["default"].TEXT
  },
  teacherDetails: {
    type: _sequelize["default"].TEXT
  },
  agentDetails: {
    type: _sequelize["default"].TEXT
  },
  studentDetails: {
    type: _sequelize["default"].TEXT
  },
  isReviewed: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isPublished: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  publishedDate: {
    type: _sequelize["default"].DATE
  },
  teacherUpdates: {
    type: _sequelize["default"].DATE
  },
  studentUpdates: {
    type: _sequelize["default"].DATE
  },
  agentUpdates: {
    type: _sequelize["default"].DATE
  },
  answerID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'examAnswer',
      key: 'answerID'
    }
  },
  studentID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'student',
      key: 'studentID'
    }
  },
  questionID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'examQuestion',
      key: 'questionID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_ExamAnswer["default"].hasMany(StudentAnswer, {
  foreignKey: {
    name: 'answerID',
    targetKey: 'answerID'
  }
});

StudentAnswer.belongsTo(_ExamAnswer["default"], {
  foreignKey: {
    name: 'answerID',
    targetKey: 'answerID'
  }
});

_Student["default"].hasMany(StudentAnswer, {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

StudentAnswer.belongsTo(_Student["default"], {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

_ExamQuestion["default"].hasMany(StudentAnswer, {
  foreignKey: {
    name: 'questionID',
    targetKey: 'questionID'
  }
});

StudentAnswer.belongsTo(_ExamQuestion["default"], {
  foreignKey: {
    name: 'questionID',
    targetKey: 'questionID'
  }
});
var _default = StudentAnswer;
exports["default"] = _default;