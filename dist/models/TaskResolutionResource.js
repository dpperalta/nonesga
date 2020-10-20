"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _TaskResolution = _interopRequireDefault(require("./TaskResolution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TaskResolutionResource = _database.sequelize.define('taskResolutionResource', {
  resourceID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  resourceName: {
    type: _sequelize["default"].TEXT
  },
  details: {
    type: _sequelize["default"].TEXT
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
  updatedDate: {
    type: _sequelize["default"].DATE
  },
  resolutionID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'taskResolution',
      key: 'resolutionID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_TaskResolution["default"].hasMany(TaskResolutionResource, {
  foreignKey: {
    name: 'resolutionID',
    targetKey: 'resolutionID'
  }
});

TaskResolutionResource.belongsTo(_TaskResolution["default"], {
  foreignKey: {
    name: 'resolutionID',
    targetKey: 'resolutionID'
  }
});
var _default = TaskResolutionResource;
exports["default"] = _default;