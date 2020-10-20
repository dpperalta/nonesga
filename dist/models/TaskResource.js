"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Task = _interopRequireDefault(require("./Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TaskResource = _database.sequelize.define('taskResource', {
  taskResourceID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  resourceName: {
    type: _sequelize["default"].STRING(250),
    allowNull: false
  },
  resourceType: {
    type: _sequelize["default"].STRING(500)
  },
  resourceDetail: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  resource: {
    type: _sequelize["default"].STRING(500)
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
  taskID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'task',
      key: 'taskID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Task["default"].hasMany(TaskResource, {
  foreignKey: {
    name: 'taskID',
    targetKey: 'taskID'
  }
});

TaskResource.belongsTo(_Task["default"], {
  foreignKey: {
    name: 'taskID',
    targetKey: 'taskID'
  }
});
var _default = TaskResource;
exports["default"] = _default;