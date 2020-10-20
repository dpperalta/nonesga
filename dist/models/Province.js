"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Country = _interopRequireDefault(require("./Country"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Province = _database.sequelize.define('province', {
  provinceID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  provinceCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  provinceName: {
    type: _sequelize["default"].STRING(100),
    allowNull: false,
    unique: true
  },
  details: {
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
  countryID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'country',
      key: 'countryID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Country["default"].hasMany(Province, {
  foreignKey: {
    name: 'countryID',
    targetKey: 'countryID'
  }
});

Province.belongsTo(_Country["default"], {
  foreignKey: {
    name: 'countryID',
    targetKey: 'countryID'
  }
});
var _default = Province;
exports["default"] = _default;