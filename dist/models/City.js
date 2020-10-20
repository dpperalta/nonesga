"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _Canton = _interopRequireDefault(require("./Canton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var City = _database.sequelize.define('city', {
  cityID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  cityCode: {
    type: _sequelize["default"].STRING(10),
    allowNull: false,
    unique: true
  },
  cityName: {
    type: _sequelize["default"].STRING(200),
    allowNull: false
  },
  cityDetail: {
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
  cantonID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'canton',
      key: 'cantonID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_Canton["default"].hasMany(City, {
  foreignKey: {
    name: 'cantonID',
    targetKey: 'cantonID'
  }
});

City.belongsTo(_Canton["default"], {
  foreignKey: {
    name: 'cantonID',
    targetKey: 'cantonID'
  }
});
var _default = City;
exports["default"] = _default;