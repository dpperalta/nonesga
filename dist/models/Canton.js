"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Province = _interopRequireDefault(require("./Province"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Canton = _database.sequelize.define('canton', {
  cantonID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  cantonCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  cantonName: {
    type: _sequelize["default"].STRING(100),
    allowNull: false,
    unique: true
  },
  details: {
    type: _sequelize["default"].TEXT
  },
  capital: {
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
  provinceID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'province',
      key: 'provinceID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Province["default"].hasMany(Canton, {
  foreignKey: {
    name: 'provinceID',
    targetKey: 'provinceID'
  }
});

Canton.belongsTo(_Province["default"], {
  foreignKey: {
    name: 'provinceID',
    targetKey: 'provinceID'
  }
});
var _default = Canton;
exports["default"] = _default;