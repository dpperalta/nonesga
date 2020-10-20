"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _ExamQuestion = _interopRequireDefault(require("./ExamQuestion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExamAnswer = _database.sequelize.define('examAnswer', {
  answerID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  answer: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  grade: {
    type: _sequelize["default"].SMALLINT,
    allowNull: false
  },
  homologatedGrade: {
    type: _sequelize["default"].STRING(5)
  },
  isCorrect: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  status: {
    type: _sequelize["default"].SMALLINT
  },
  detail: {
    type: _sequelize["default"].TEXT
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

_ExamQuestion["default"].hasMany(ExamAnswer, {
  foreignKey: {
    name: 'questionID',
    targetKey: 'questionID'
  }
});

ExamAnswer.belongsTo(_ExamQuestion["default"], {
  foreignKey: {
    name: 'questionID',
    targetKey: 'questionID'
  }
});
var _default = ExamAnswer;
exports["default"] = _default;