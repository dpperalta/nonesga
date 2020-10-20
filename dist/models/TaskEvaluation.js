"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Task = _interopRequireDefault(require("./Task"));

var _Student = _interopRequireDefault(require("./Student"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TaskEvaluation = _database.sequelize.define('taskEvaluation', {
  taskEvaluationID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  taskScore: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  scoreHomologation: {
    type: _sequelize["default"].STRING(5)
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    allowNull: false,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP')
  },
  unregisteredDate: {
    type: _sequelize["default"].DATE
  },
  taskEvaluationDate: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  studentDetail: {
    type: _sequelize["default"].TEXT
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  agentDetail: {
    type: _sequelize["default"].TEXT
  },
  taskID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Task',
      key: 'taskID'
    }
  },
  studentID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'Student',
      key: 'studentID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Task["default"].hasMany(TaskEvaluation, {
  foreignKey: {
    name: 'taskID',
    targetKey: 'taskID'
  }
});

TaskEvaluation.belongsTo(_Task["default"], {
  foreignKey: {
    name: 'taskID',
    targetKey: 'taskID'
  }
});

_Student["default"].hasMany(TaskEvaluation, {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

TaskEvaluation.belongsTo(_Student["default"], {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});
var _default = TaskEvaluation;
exports["default"] = _default;