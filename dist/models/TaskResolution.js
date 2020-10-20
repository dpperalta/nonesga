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

var TaskResolution = _database.sequelize.define('taskResolution', {
  resolutionID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  detail: {
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
  updatedDate: {
    type: _sequelize["default"].DATE
  },
  isPublished: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  publishedDate: {
    type: _sequelize["default"].DATE
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

_Task["default"].hasMany(TaskResolution, {
  foreignKey: {
    name: 'taskID',
    targetKey: 'taskID'
  }
});

TaskResolution.belongsTo(_Task["default"], {
  foreignKey: {
    name: 'taskID',
    targetKey: 'taskID'
  }
});

_Student["default"].hasMany(TaskResolution, {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});

TaskResolution.belongsTo(_Student["default"], {
  foreignKey: {
    name: 'studentID',
    targetKey: 'studentID'
  }
});
var _default = TaskResolution;
exports["default"] = _default;