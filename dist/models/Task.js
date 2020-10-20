"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Subject = _interopRequireDefault(require("./Subject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Task = _database.sequelize.define('task', {
  taskID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  taskCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false
  },
  startDate: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  endDate: {
    type: _sequelize["default"].DATE,
    allowNull: false
  },
  taskName: {
    type: _sequelize["default"].STRING(300),
    allowNull: false
  },
  taskDetail: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  permitsDelay: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  maxDelay: {
    type: _sequelize["default"].DATE
  },
  image: {
    type: _sequelize["default"].STRING(500)
  },
  subjectID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'subject',
      key: 'subjectID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Subject["default"].hasMany(Task, {
  foreignKey: {
    name: 'subjectID',
    targetKey: 'subjectID'
  }
});

Task.belongsTo(_Subject["default"], {
  foreignKey: {
    name: 'subjectID',
    targetKey: 'subjectID'
  }
});
var _default = Task;
exports["default"] = _default;