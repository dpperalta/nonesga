"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

var _City = _interopRequireDefault(require("./City"));

var _Person = _interopRequireDefault(require("./Person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Address = _database.sequelize.define('address', {
  addressID: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  addressName: {
    type: _sequelize["default"].STRING(200)
  },
  mainStreet: {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  },
  number: {
    type: _sequelize["default"].STRING(5),
    defaultValue: 'N/A',
    allowNull: false
  },
  secondStreet: {
    type: _sequelize["default"].STRING(100),
    allowNull: false
  },
  references: {
    type: _sequelize["default"].TEXT
  },
  zipCode: {
    type: _sequelize["default"].STRING(8)
  },
  latitude: {
    type: _sequelize["default"].DOUBLE
  },
  longitude: {
    type: _sequelize["default"].DOUBLE
  },
  addressType: {
    type: _sequelize["default"].SMALLINT
  },
  registeredDate: {
    type: _sequelize["default"].DATE,
    defaultValue: _database.sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  unregistredDate: {
    type: _sequelize["default"].DATE
  },
  isActive: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  isFavourite: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  cityID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'city',
      key: 'cityID'
    }
  },
  personID: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: 'person',
      key: 'personID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

_City["default"].hasMany(Address, {
  foreignKey: {
    name: 'cityID',
    targetKey: 'cityID'
  }
});

Address.belongsTo(_City["default"], {
  foreignKey: {
    name: 'cityID',
    targetKey: 'cityID'
  }
});

_Person["default"].hasMany(Address, {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});

Address.belongsTo(_Person["default"], {
  foreignKey: {
    name: 'personID',
    targetKey: 'personID'
  }
});
var _default = Address;
exports["default"] = _default;