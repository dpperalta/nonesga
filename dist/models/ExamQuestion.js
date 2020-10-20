"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Exam = _interopRequireDefault(require("./Exam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExamQuestion = _database.sequelize.define('examQuestion', {
  questionID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  question: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  minGrade: {
    type: _sequelize["default"].SMALLINT
  },
  maxGrade: {
    type: _sequelize["default"].SMALLINT
  },
  image: {
    type: _sequelize["default"].STRING(500)
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
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
  examID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'exam',
      key: 'examID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Exam["default"].hasMany(ExamQuestion, {
  foreignKey: {
    name: 'examID',
    targetKey: 'examID'
  }
});

ExamQuestion.belongsTo(_Exam["default"], {
  foreignKey: {
    name: 'examID',
    targetKey: 'examID'
  }
});
var _default = ExamQuestion;
exports["default"] = _default;